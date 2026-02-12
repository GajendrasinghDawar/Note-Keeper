import { useState, useCallback } from 'react'
import { RecentFilesDB } from '@/utils/recent_files'

interface FilePickerAcceptType {
  description?: string
  accept: Record<string, readonly string[]>
}

declare global {
  interface Window {
    showOpenFilePicker(options?: {
      types?: FilePickerAcceptType[]
      multiple?: boolean
    }): Promise<FileSystemFileHandle[]>
    showSaveFilePicker(options?: {
      types?: FilePickerAcceptType[]
      suggestedName?: string
    }): Promise<FileSystemFileHandle>
  }
}

interface FileState {
  handle: FileSystemFileHandle | null
  content: string
  fileName: string
  dirHandle: FileSystemDirectoryHandle | null
}

const INITIAL_STATE: FileState = {
  handle: null,
  content: '',
  fileName: '',
  dirHandle: null,
}

const MD_ACCEPT_TYPES = [
  {
    description: 'Markdown files',
    accept: { 'text/markdown': ['.md', '.markdown', '.mdx', '.mdown'] },
  },
] as const

/** Max file size: 5 MB — prevents browser freeze on huge files */
const MAX_FILE_SIZE = 5 * 1024 * 1024

/** Whether the File System Access API is available (Chromium only) */
export const HAS_FILE_PICKER = typeof window !== 'undefined' && 'showOpenFilePicker' in window

/** Module-level cache so dirHandle survives navigations within the same session */
let cachedDirHandle: FileSystemDirectoryHandle | null = null

function cacheDirHandle(handle: FileSystemDirectoryHandle | null) {
  if (handle) cachedDirHandle = handle
}

export function useFileHandler() {
  const [file, setFile] = useState<FileState>({
    ...INITIAL_STATE,
    dirHandle: cachedDirHandle,
  })
  const [isDirty, setIsDirty] = useState(false)

  const readFileHandle = useCallback(
    async (handle: FileSystemFileHandle, dirHandle?: FileSystemDirectoryHandle | null) => {
      try {
        const f = await handle.getFile()
        if (f.size > MAX_FILE_SIZE) {
          alert(`File is too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`)
          return
        }
        const text = await f.text()
        const resolvedDir = dirHandle ?? cachedDirHandle
        cacheDirHandle(resolvedDir)
        setFile(prev => ({
          handle,
          content: text,
          fileName: f.name,
          dirHandle: resolvedDir ?? prev.dirHandle,
        }))
        setIsDirty(false)
        RecentFilesDB.track(f.name, text, handle).catch(() => {})
      } catch (err) {
        console.error('Failed to read file:', err)
        alert('Could not read the file. It may have been moved or permissions were revoked.')
      }
    },
    []
  )

  /**
   * Load file content directly (no handle — used for drag-drop fallback and
   * share target). The file cannot be saved back to the OS.
   */
  const loadReadOnlyFile = useCallback((name: string, content: string) => {
    setFile({ handle: null, content, fileName: name, dirHandle: null })
    setIsDirty(false)
    RecentFilesDB.track(name, content).catch(() => {})
  }, [])

  const openFile = useCallback(async () => {
    if (!HAS_FILE_PICKER) {
      // Fallback: use a regular <input type="file"> via click
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.md,.markdown,.mdx,.mdown,text/markdown'
      input.addEventListener('change', async () => {
        const f = input.files?.[0]
        if (!f) return
        if (f.size > MAX_FILE_SIZE) {
          alert(`File is too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Maximum is 5 MB.`)
          return
        }
        const text = await f.text()
        loadReadOnlyFile(f.name, text)
      })
      input.click()
      return
    }

    try {
      const [handle] = await window.showOpenFilePicker({
        types: [...MD_ACCEPT_TYPES],
        multiple: false,
      })
      await readFileHandle(handle)
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Failed to open file:', err)
      }
    }
  }, [readFileHandle, loadReadOnlyFile])

  /**
   * Open a folder so relative .md links resolve automatically.
   * Called once by the user; the directory handle is cached for the session.
   */
  const openFolder = useCallback(async () => {
    if (!HAS_FILE_PICKER || !('showDirectoryPicker' in window)) return
    try {
      const dirHandle = await (window as any).showDirectoryPicker({ mode: 'read' })
      if (dirHandle) {
        cacheDirHandle(dirHandle)
        setFile(prev => ({ ...prev, dirHandle }))
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Failed to pick directory:', err)
      }
    }
  }, [])

  const saveFile = useCallback(
    async (markdown: string) => {
      const currentHandle = file.handle
      if (!currentHandle) return

      try {
        const writable = await currentHandle.createWritable()
        await writable.write(markdown)
        await writable.close()
        setFile(prev => ({ ...prev, content: markdown }))
        setIsDirty(false)
      } catch (err) {
        console.error('Failed to save file:', err)
        alert('Could not save the file. The file may have been moved or permissions were revoked.')
      }
    },
    [file.handle]
  )

  const saveFileAs = useCallback(
    async (markdown: string) => {
      if (!HAS_FILE_PICKER) {
        // Fallback: trigger a download
        const blob = new Blob([markdown], { type: 'text/markdown' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = file.fileName || 'untitled.md'
        a.click()
        URL.revokeObjectURL(a.href)
        return
      }

      try {
        const handle = await window.showSaveFilePicker({
          types: [...MD_ACCEPT_TYPES],
          suggestedName: file.fileName || 'untitled.md',
        })
        const writable = await handle.createWritable()
        await writable.write(markdown)
        await writable.close()
        const f = await handle.getFile()
        setFile({ handle, content: markdown, fileName: f.name })
        setIsDirty(false)
        RecentFilesDB.track(f.name, markdown, handle).catch(() => {})
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Failed to save file:', err)
        }
      }
    },
    [file.fileName]
  )

  const setDirHandle = useCallback((dirHandle: FileSystemDirectoryHandle) => {
    setFile(prev => ({ ...prev, dirHandle }))
  }, [])

  /**
   * Open a relative .md file from the current directory handle.
   * If no directory handle is stored, prompt the user to pick the folder.
   */
  const openRelativeFile = useCallback(
    async (href: string) => {
      // Strip hash / query
      const cleanPath = href.split(/[?#]/)[0]
      const segments = cleanPath.split('/').filter(Boolean)
      const fileName = segments.pop()
      if (!fileName) return

      let dirHandle = file.dirHandle

      // If no directory handle yet, prompt the user once (on this click gesture)
      if (!dirHandle) {
        if (!HAS_FILE_PICKER || !('showDirectoryPicker' in window)) return
        try {
          dirHandle = await (window as any).showDirectoryPicker({ mode: 'read' })
          if (dirHandle) {
            cacheDirHandle(dirHandle)
            setFile(prev => ({ ...prev, dirHandle }))
          }
        } catch (err) {
          if ((err as Error).name !== 'AbortError') {
            console.error('Failed to pick directory:', err)
          }
          return
        }
        if (!dirHandle) return
      }

      try {
        // Traverse subdirectories if the link has path segments
        let current = dirHandle
        for (const seg of segments) {
          if (seg === '.') continue
          if (seg === '..') {
            // Can't go above the chosen directory
            alert('Cannot navigate above the selected folder.')
            return
          }
          current = await current.getDirectoryHandle(seg)
        }
        const fileHandle = await current.getFileHandle(fileName)
        await readFileHandle(fileHandle, dirHandle)
      } catch (err) {
        console.error('Failed to open relative file:', err)
        alert(
          `Could not open "${cleanPath}". Make sure the file exists in the selected folder.`
        )
      }
    },
    [file.dirHandle, readFileHandle]
  )

  const updateContent = useCallback((markdown: string) => {
    setFile(prev => ({ ...prev, content: markdown }))
    setIsDirty(true)
  }, [])

  const reset = useCallback(() => {
    setFile(INITIAL_STATE)
    setIsDirty(false)
  }, [])

  return {
    file,
    isDirty,
    openFile,
    openFolder,
    saveFile,
    saveFileAs,
    updateContent,
    readFileHandle,
    loadReadOnlyFile,
    openRelativeFile,
    setDirHandle,
    reset,
  }
}
