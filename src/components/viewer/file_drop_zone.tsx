import { useCallback, useRef, useState, type DragEvent, type ReactNode } from 'react'

const MD_PATTERN = /\.(md|markdown|mdx|mdown)$/i

interface FileDropZoneProps {
  onFileHandleDrop: (handle: FileSystemFileHandle) => void
  onReadOnlyDrop: (name: string, content: string) => void
  children: ReactNode
}

export default function FileDropZone({
  onFileHandleDrop,
  onReadOnlyDrop,
  children,
}: FileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  // Counter approach prevents flicker when dragging over child elements
  const dragCounter = useRef(0)

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault()
    dragCounter.current++
    if (dragCounter.current === 1) setIsDragging(true)
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    dragCounter.current--
    if (dragCounter.current === 0) setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    async (e: DragEvent) => {
      e.preventDefault()
      dragCounter.current = 0
      setIsDragging(false)

      try {
        const items = [...e.dataTransfer.items]
        for (const item of items) {
          if (item.kind !== 'file') continue

          // Try to get a FileSystemFileHandle for write-back support
          try {
            const handle = await (
              item as unknown as { getAsFileSystemHandle: () => Promise<FileSystemHandle> }
            ).getAsFileSystemHandle?.()

            if (handle && handle.kind === 'file') {
              const fileHandle = handle as FileSystemFileHandle
              const file = await fileHandle.getFile()
              if (MD_PATTERN.test(file.name)) {
                onFileHandleDrop(fileHandle)
                return
              }
            }
          } catch {
            // getAsFileSystemHandle not supported or failed — fall through
          }

          // Fallback: read as File without a handle (no save-back capability)
          const file = item.getAsFile()
          if (file && MD_PATTERN.test(file.name)) {
            const text = await file.text()
            onReadOnlyDrop(file.name, text)
            return
          }
        }
      } catch (err) {
        console.error('Error processing dropped file:', err)
      }
    },
    [onFileHandleDrop, onReadOnlyDrop]
  )

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`min-h-full transition-colors duration-200 ${
        isDragging ? 'bg-crimson3 ring-2 ring-crimson7 ring-dashed rounded-lg' : ''
      }`}
    >
      {isDragging && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slateA5 backdrop-blur-sm pointer-events-none'>
          <div className='bg-slate2 border-2 border-dashed border-crimson8 rounded-xl px-10 py-8 shadow-4'>
            <p className='text-lg font-semibold text-slate12'>Drop your .md file here</p>
          </div>
        </div>
      )}
      {children}
    </div>
  )
}
