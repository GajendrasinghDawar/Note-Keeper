import { useNavigate, useLoaderData, Link, LoaderFunctionArgs } from "react-router-dom";
import { DB } from "@/utils/db";
import { Note } from '@/types';

export async function loader({ params }: LoaderFunctionArgs) {

    const noteId = Number(params.noteId);
    const note = await DB.getNote(noteId);

    return { note };
}

export default function Show() {
    const { note } = useLoaderData() as { note: Note };
    const navigate = useNavigate();

    const handleDelete = async () => {
        await DB.deleteNote(note.id!);
        navigate('/');
    };

    return (
        <div className="relative w-full h-full">

            <div className="relative container mx-auto px-3 py-4 bg-yellow-yellow1 "> {/* Text Container */ }
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-4 capitalize text-shadow">{ note.title }</h1>
                    <section className="flex justify-between items-baseline">
                        <p className="text-xs font-medium text-gray-800">{ new Date(note.created).toLocaleString() }</p>
                        <div>
                            <button
                                onClick={ handleDelete }
                                className="text-sm font-semibold text-red-600 hover:text-red-500 mt-2"
                            >
                                Delete Note
                            </button>
                            <Link
                                to={ `/note/${note.id}/edit` }
                                className="ml-2 text-sm font-semibold text-green-600 hover:text-green-500 mt-2"
                            >
                                Edit note
                            </Link>
                        </div>
                    </section>
                </div>
                <div
                    className="mt-4 prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl text-gray-800"
                    dangerouslySetInnerHTML={ { __html: note.content } }
                />
            </div>
        </div>
    );
}
