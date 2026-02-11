import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { DB } from '@/utils/db'
import type { Note } from '@/types'

interface ViewerToolbarProps {
  fileName: string
  mode: 'view' | 'edit'
  isDirty: boolean
  hasFile: boolean
  canSaveBack: boolean
  onOpenFile: () => void
  onToggleMode: () => void
  onSave: () => void
  onSaveAs: () => void
  rawMarkdown: string
}

export default function ViewerToolbar({
  fileName,
  mode,
  isDirty,
  hasFile,
  canSaveBack,
  onOpenFile,
  onToggleMode,
  onSave,
  onSaveAs,
  rawMarkdown,
}: ViewerToolbarProps) {
  const navigate = useNavigate()
  const [isSavingToNotes, setIsSavingToNotes] = useState(false)

  const handleSaveToNotes = async () => {
    if (isSavingToNotes) return
    setIsSavingToNotes(true)

    try {
      const title = fileName.replace(/\.(md|markdown|mdx|mdown)$/i, '') || 'Imported note'
      const html = await marked(rawMarkdown, { gfm: true, breaks: true })
      const note: Note = {
        title,
        content: html,
        created: new Date(),
      }
      const id = await DB.saveNote(note)
      navigate(`/note/${id}`)
    } catch (err) {
      console.error('Failed to save note:', err)
      alert('Could not save to notes. Please try again.')
      setIsSavingToNotes(false)
    }
  }

  return (
    <div className='flex flex-wrap items-center gap-2 px-3 py-2 border-b border-slate5 bg-slate2 sticky top-0 z-10'>
      {/* File name */}
      <span className='text-sm font-medium text-slate11 truncate max-w-48 mr-auto'>
        {fileName || 'No file open'}
        {isDirty && <span className='text-crimson9 ml-1'>*</span>}
      </span>

      {/* Open file */}
      <button
        onClick={onOpenFile}
        className='text-xs font-medium px-3 py-1.5 rounded-md bg-slate4 text-slate11 hover:bg-slate5 transition-colors'
      >
        Open file
      </button>

      {/* Toggle view/edit */}
      {hasFile && (
        <button
          onClick={onToggleMode}
          className='text-xs font-medium px-3 py-1.5 rounded-md bg-slate4 text-slate11 hover:bg-slate5 transition-colors'
        >
          {mode === 'view' ? 'Edit' : 'Preview'}
        </button>
      )}

      {/* Save back (only if we have a FileSystemFileHandle) */}
      {hasFile && canSaveBack && mode === 'edit' && (
        <button
          onClick={onSave}
          disabled={!isDirty}
          className='text-xs font-medium px-3 py-1.5 rounded-md bg-crimson9 text-slate1 hover:bg-crimson10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          Save
        </button>
      )}

      {/* Save As */}
      {hasFile && mode === 'edit' && (
        <button
          onClick={onSaveAs}
          className='text-xs font-medium px-3 py-1.5 rounded-md bg-slate4 text-slate11 hover:bg-slate5 transition-colors'
        >
          Save As
        </button>
      )}

      {/* Save to Notes (import into IndexedDB) */}
      {hasFile && (
        <button
          onClick={handleSaveToNotes}
          disabled={isSavingToNotes}
          className='text-xs font-medium px-3 py-1.5 rounded-md bg-jade9 text-slate1 hover:bg-jade10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {isSavingToNotes ? 'Saving…' : 'Save to Notes'}
        </button>
      )}
    </div>
  )
}
