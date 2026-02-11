import { useLoaderData } from 'react-router-dom'
import { DB } from '@/utils/db'
import NoNoteGreet from '@/components/no_note_greet'

export async function loader() {
  const allNotes = await DB.getNotes()
  return { noteCount: allNotes.length }
}

export default function Home() {
  const { noteCount } = useLoaderData() as { noteCount: number }

  return (
    <div className='p-4'>
      <NoNoteGreet noteCount={noteCount} />
    </div>
  )
}
