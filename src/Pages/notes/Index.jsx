import { useLoaderData } from "react-router-dom";
import { Link } from 'react-router-dom';

import { DB } from '@/utils/db';
import NoNoteGreet from "@/components/NoNoteGreet";

export async function loader() {
    const allNotes = await DB.getNotes();
    return { allNotes };
}

export default function Index() {
    const { allNotes } = useLoaderData();

    return (
        <div className="p-4">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                { allNotes.length === 0 ? (
                    <NoNoteGreet />
                ) : (
                        <>
                            { allNotes.map(note => (
                                <li key={ note.id } className="border border-yellow-yellow5 rounded-lg hover:shadow-sm overflow-hidden">
                                    <Link to={ `/note/${note.id}` } className="block p-4 rounded h-full w-full   bg-yellow-yellow2">
                                        <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2 truncate w-full">{ note.title }</h3>
                                        <p className="mt-auto text-xs font-bold text-gray-gray11">{ new Date(note.created).toLocaleString() }</p>
                                    </Link>
                                </li>
                            )) }
                        </>
                ) }
            </ul>
        </div>
    );
}

