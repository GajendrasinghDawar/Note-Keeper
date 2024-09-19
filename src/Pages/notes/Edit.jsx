import React, { useState, useEffect } from 'react';
import { DB } from '@/utils/db';
import NoteForm from '@/components/NoteForm';
import { useNavigate, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    const noteId = Number(params.noteId);
    const note = await DB.getNote(noteId);
    return { note };
}

export default function Edit() {
    let navigate = useNavigate()

    const { note } = useLoaderData();

    const [ data, setData ] = useState({ content: '', title: '', ...note });

    async function submit(e) {
        e.preventDefault();

        await DB.saveNote({
            id: note.id,
            content: data.content,
            title: data.title,
            created: note.created,
        });
        navigate(`/note/${note.id}`);
    }

    return (
        <div className='w-full px-3'>
            <div className="w-full">
                <div className="my-3 py-6 md:col-start-2 md:col-end-8">
                    <NoteForm data={ data } setData={ setData } handleSubmit={ submit } />
                </div>
            </div>
        </div>
    );
}