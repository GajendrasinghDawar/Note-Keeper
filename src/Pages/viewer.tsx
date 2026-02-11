import { useState, useCallback, useRef, useEffect } from 'react'
import { Editor, EditorProvider } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import Link from '@tiptap/extension-link'

import MarkdownRenderer from '@/components/viewer/markdown_renderer'
import FileDropZone from '@/components/viewer/file_drop_zone'
import ViewerToolbar from '@/components/viewer/viewer_toolbar'
import MenuBar from '@/components/menubar'
import { useFileHandler } from '@/hooks/use_file_handler'
import { useFileLauncher } from '@/hooks/use_file_launcher'

const editorExtensions = [
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: 'https',
  }),
  Markdown.configure({ html: true }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Record<string, unknown>),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: true },
    orderedList: { keepMarks: true },
  }),
]

/**
 * Try to read the shared file from the SW cache, retrying a few times
 * because the SW redirect may land before the cache write finishes.
 */
async function readSharedFileFromCache(retries = 3, delay = 150): Promise<string | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const cache = await caches.open('share-target-cache')
      const response = await cache.match('/shared-file')
      if (response) {
        const text = await response.text()
        await cache.delete('/shared-file')
        return text
      }
    } catch (err) {
      console.error('Failed to read shared file from cache:', err)
    }
    if (i < retries - 1) {
      await new Promise(r => setTimeout(r, delay))
    }
  }
  return null
}

export default function MarkdownViewer() {
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const editorRef = useRef<Editor | null>(null)
  const {
    file,
    isDirty,
    openFile,
    saveFile,
    saveFileAs,
    updateContent,
    readFileHandle,
    loadReadOnlyFile,
  } = useFileHandler()

  // Launch Queue: OS opens a .md file with this app
  useFileLauncher(
    useCallback(
      handle => {
        readFileHandle(handle)
      },
      [readFileHandle]
    )
  )

  // Check URL for share target POST (file shared from Android)
  useEffect(() => {
    const url = new URL(window.location.href)

    if (url.searchParams.get('shared') === 'true') {
      ;(async () => {
        const text = await readSharedFileFromCache()
        if (text) {
          loadReadOnlyFile('shared.md', text)
        }
        window.history.replaceState({}, '', '/viewer')
      })()
      return
    }

    // Fallback: content passed via URL params (e.g. Web Share Target text)
    const sharedContent = url.searchParams.get('content')
    if (sharedContent) {
      loadReadOnlyFile('shared.md', decodeURIComponent(sharedContent))
      window.history.replaceState({}, '', '/viewer')
    }
  }, [loadReadOnlyFile])

  const toggleMode = useCallback(() => {
    if (mode === 'edit' && editorRef.current) {
      // Leaving edit mode — pull updated markdown from TipTap
      const md = editorRef.current.storage.markdown.getMarkdown()
      updateContent(md)
    }
    setMode(prev => (prev === 'view' ? 'edit' : 'view'))
  }, [mode, updateContent])

  const handleSave = useCallback(() => {
    if (mode === 'edit' && editorRef.current) {
      const md = editorRef.current.storage.markdown.getMarkdown()
      saveFile(md)
    } else {
      saveFile(file.content)
    }
  }, [mode, file.content, saveFile])

  const handleSaveAs = useCallback(() => {
    if (mode === 'edit' && editorRef.current) {
      const md = editorRef.current.storage.markdown.getMarkdown()
      saveFileAs(md)
    } else {
      saveFileAs(file.content)
    }
  }, [mode, file.content, saveFileAs])

  const canSaveBack = file.handle !== null

  // Keyboard shortcut: Ctrl+S / Cmd+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (canSaveBack) {
          handleSave()
        } else {
          handleSaveAs()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [canSaveBack, handleSave, handleSaveAs])

  return (
    <FileDropZone onFileHandleDrop={readFileHandle} onReadOnlyDrop={loadReadOnlyFile}>
      <div className='flex flex-col min-h-[calc(100vh-64px)]'>
        <ViewerToolbar
          fileName={file.fileName}
          mode={mode}
          isDirty={isDirty}
          hasFile={!!file.content}
          canSaveBack={canSaveBack}
          onOpenFile={openFile}
          onToggleMode={toggleMode}
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          rawMarkdown={file.content}
        />

        <div className='flex-1 px-4 py-6'>
          {!file.content ? (
            <EmptyState onOpenFile={openFile} />
          ) : mode === 'view' ? (
            <MarkdownRenderer content={file.content} />
          ) : (
            <div className='border border-slate6 rounded-lg overflow-hidden focus-within:border-slate9'>
              <EditorProvider
                key={file.fileName + '-editor'}
                onUpdate={({ editor }) => {
                  editorRef.current = editor
                }}
                onCreate={({ editor }) => {
                  editorRef.current = editor
                }}
                slotBefore={<MenuBar />}
                extensions={editorExtensions}
                content={file.content}
                editorProps={{
                  attributes: {
                    class: 'prose focus:outline-none overflow-y-auto h-full px-2 mb-3 min-h-40',
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </FileDropZone>
  )
}

function EmptyState({ onOpenFile }: { onOpenFile: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center py-32 text-center'>
      <h2 className='text-xl font-semibold text-slate12 mb-2'>Markdown Viewer</h2>
      <p className='text-sm text-slate10 mb-6 max-w-80'>
        Open a .md file to view or edit it. You can also drag & drop a file here, or open one from
        your file manager.
      </p>
      <button
        onClick={onOpenFile}
        className='px-5 py-2 text-sm font-medium rounded-lg bg-crimson9 text-slate1 hover:bg-crimson10 transition-colors shadow-2'
      >
        Open a Markdown file
      </button>
    </div>
  )
}
