import { useState, useEffect, useCallback } from 'react'
import { FileText, X } from 'lucide-react'
import { RecentFilesDB, type RecentFile } from '@/utils/recent_files'

interface RecentFilesProps {
  onOpenHandle: (handle: FileSystemFileHandle) => void
  onOpenReadOnly: (name: string, content: string) => void
}

export default function RecentFiles({ onOpenHandle, onOpenReadOnly }: RecentFilesProps) {
  const [files, setFiles] = useState<RecentFile[]>([])
  const [loading, setLoading] = useState(true)

  const loadFiles = useCallback(async () => {
    try {
      const recent = await RecentFilesDB.getAll()
      setFiles(recent)
    } catch (err) {
      console.error('Failed to load recent files:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadFiles()
  }, [loadFiles])

  const handleOpen = useCallback(
    async (entry: RecentFile) => {
      if (entry.handle) {
        try {
          // Re-request permission — handles expire across sessions
          const permission = await (
            entry.handle as unknown as {
              queryPermission: (opts: { mode: string }) => Promise<string>
            }
          ).queryPermission({ mode: 'read' })

          if (permission !== 'granted') {
            const requested = await (
              entry.handle as unknown as {
                requestPermission: (opts: { mode: string }) => Promise<string>
              }
            ).requestPermission({ mode: 'read' })

            if (requested !== 'granted') {
              // Permission denied — remove stale entry
              await RecentFilesDB.remove(entry.fileName)
              setFiles(prev => prev.filter(f => f.fileName !== entry.fileName))
              return
            }
          }

          onOpenHandle(entry.handle)
          return
        } catch {
          // Handle is stale (file moved/deleted) — remove it
          await RecentFilesDB.remove(entry.fileName)
          setFiles(prev => prev.filter(f => f.fileName !== entry.fileName))
          return
        }
      }

      // No handle — use the preview as fallback content (read-only)
      onOpenReadOnly(entry.fileName, entry.preview)
    },
    [onOpenHandle, onOpenReadOnly]
  )

  const handleRemove = useCallback(async (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation()
    await RecentFilesDB.remove(fileName)
    setFiles(prev => prev.filter(f => f.fileName !== fileName))
  }, [])

  const handleClearAll = useCallback(async () => {
    await RecentFilesDB.clear()
    setFiles([])
  }, [])

  if (loading) return null
  if (files.length === 0) return null

  return (
    <div className='mt-8 w-full max-w-md mx-auto'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-sm font-semibold text-slate11 uppercase tracking-wider'>
          Recent files
        </h3>
        <button
          onClick={handleClearAll}
          className='text-xs text-slate9 hover:text-crimson9 transition-colors'
        >
          Clear all
        </button>
      </div>

      <ul className='divide-y divide-slate4 border border-slate5 rounded-lg overflow-hidden'>
        {files.map(entry => (
          <li key={entry.fileName}>
            <button
              onClick={() => handleOpen(entry)}
              className='w-full text-left px-4 py-3 hover:bg-slate3 transition-colors group flex items-start gap-3'
            >
              <span className='shrink-0 mt-0.5 text-slate9'>
                <FileText className='size-4' />
              </span>

              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-slate12 truncate'>{entry.fileName}</p>
                <p className='text-xs text-slate9 truncate mt-0.5'>
                  {entry.preview.slice(0, 80).replace(/\n/g, ' ')}
                </p>
                <p className='text-xs text-slate8 mt-1'>{formatTimeAgo(entry.lastOpened)}</p>
              </div>

              <button
                onClick={e => handleRemove(e, entry.fileName)}
                className='shrink-0 mt-0.5 p-1 rounded text-slate8 opacity-0 group-hover:opacity-100 hover:text-crimson9 hover:bg-crimsonA3 transition-all'
                title='Remove from recent'
              >
                <X className='size-3.5' />
              </button>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}
