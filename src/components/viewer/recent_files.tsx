import { useState, useEffect, useCallback } from 'react'
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
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 2.5C3 2.22386 3.22386 2 3.5 2H9.08579C9.21839 2 9.34557 2.05268 9.43934 2.14645L11.8536 4.56066C11.9473 4.65443 12 4.78161 12 4.91421V12.5C12 12.7761 11.7761 13 11.5 13H3.5C3.22386 13 3 12.7761 3 12.5V2.5ZM3.5 1C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V4.91421C13 4.51639 12.842 4.13486 12.5607 3.85355L10.1464 1.43934C9.86514 1.15804 9.48361 1 9.08579 1H3.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 9C4.22386 9 4 9.22386 4 9.5C4 9.77614 4.22386 10 4.5 10H10.5C10.7761 10 11 9.77614 11 9.5C11 9.22386 10.7761 9 10.5 9H4.5ZM4.5 11C4.22386 11 4 11.2239 4 11.5C4 11.7761 4.22386 12 4.5 12H7.5C7.77614 12 8 11.7761 8 11.5C8 11.2239 7.77614 11 7.5 11H4.5Z'
                    fill='currentColor'
                    fillRule='evenodd'
                    clipRule='evenodd'
                  />
                </svg>
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
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z'
                    fill='currentColor'
                    fillRule='evenodd'
                    clipRule='evenodd'
                  />
                </svg>
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
