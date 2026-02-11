import { useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'

import { DB } from '@/utils/db'
import { Note } from '@/types'

export async function loader() {
  const allNotes = await DB.getNotes()
  return { allNotes }
}

export default function Index() {
  const { allNotes } = useLoaderData() as { allNotes: Note[] }

  return (
    <div className='py-6 px-2'>
      <div className='flex items-baseline justify-between mb-6'>
        <h1 className='text-lg font-semibold text-slate12'>
          All Notes
          <span className='ml-2 text-sm font-normal text-slate9'>({allNotes.length})</span>
        </h1>
      </div>

      {allNotes.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <FileText className='size-10 text-slate7 mb-3' strokeWidth={1.2} />
          <p className='text-sm text-slate10'>No notes yet. Create one to get started.</p>
        </div>
      ) : (
        <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {allNotes.map(note => (
            <li key={note.id}>
              <Link
                to={`/note/${note.id}`}
                className='block p-5 rounded-xl border border-yellow5 bg-yellow2 hover:bg-yellow3 hover:border-yellow6 no-underline transition-colors h-full'
              >
                <h3 className='text-base font-semibold text-slate12 capitalize truncate'>
                  {note.title}
                </h3>
                <p className='text-xs text-slate9 mt-3'>
                  {new Date(note.created).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
