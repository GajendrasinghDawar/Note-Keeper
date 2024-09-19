import { useLoaderData } from "react-router-dom";
import { Link } from 'react-router-dom';

import { DB } from '@/utils/db';

export async function loader() {
    const allNotes = await DB.getNotes();
    return { allNotes };
}

export default function Index() {
    const { allNotes } = useLoaderData();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Notes</h1>
            <ul className="space-y-4">
                { allNotes.length === 0 ? (
                    <p className="text-gray-500">No notes found. Create a new note to get started.</p>
                ) : (
                    <ul className="space-y-4">
                        { allNotes.map(note => (
                            <li key={ note.id } className=" border border-sand-sand4 rounded-lg hover:shadow-sm  overflow-hidden">
                                <Link to={ `/note/${note.id}` } className="block bg-sand-sand2 p-2 rounded h-full w-full">
                                    <h3 className="text-lg font-semibold text-gray-gray11 capitalize mb-2">{ note.title }</h3>
                                    <p className="text-xs font-bold text-gray-gray11">{ new Date(note.created).toLocaleString() }</p>
                                </Link>
                            </li>
                        )) }
                    </ul>
                ) }
            </ul>
        </div>
    );
}