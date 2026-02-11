import React, { useState } from 'react'
import { DB } from '@/utils/db'
import NoteForm from '@/components/note_form'
import { useNavigate } from 'react-router-dom'
import { NoteFormData } from '@/types'

export default function Create() {
  const [data, setData] = useState<NoteFormData>({ content: '', title: '' })
  const navigate = useNavigate()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const noteId = await DB.saveNote({
      content: data.content,
      title: data.title,
      created: new Date(),
    })
    navigate(`/note/${noteId}`)
  }

  return (
    <div className='w-fulll  px-3 bg-yellow1'>
      <div className=' w-full'>
        <div className='my-3 py-6 md:col-start-2 md:col-end-8'>
          <NoteForm data={data} setData={setData} handleSubmit={submit} />
        </div>
      </div>
    </div>
  )
}
