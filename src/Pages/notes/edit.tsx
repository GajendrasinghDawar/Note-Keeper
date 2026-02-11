import React, { useState } from 'react'
import { DB } from '@/utils/db'
import NoteForm from '@/components/note_form'
import { useNavigate, useLoaderData, LoaderFunctionArgs } from 'react-router-dom'
import { Note, NoteFormData } from '@/types'

export async function loader({ params }: LoaderFunctionArgs) {
  const noteId = Number(params.noteId)
  const note = await DB.getNote(noteId)
  return { note }
}

export default function Edit() {
  const navigate = useNavigate()

  const { note } = useLoaderData() as { note: Note }

  const [data, setData] = useState<NoteFormData>({
    content: note.content ?? '',
    title: note.title ?? '',
  })

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    await DB.saveNote({
      id: note.id,
      content: data.content,
      title: data.title,
      created: note.created,
    })
    navigate(`/note/${note.id}`)
  }

  return (
    <div className='w-full px-3'>
      <div className='w-full'>
        <div className='my-3 py-6 md:col-start-2 md:col-end-8'>
          <NoteForm data={data} setData={setData} handleSubmit={submit} />
        </div>
      </div>
    </div>
  )
}
