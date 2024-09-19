import { useNavigate, useLoaderData, Link } from "react-router-dom";
import { DB } from "@/utils/db";

export async function loader({ params }) {

    const noteId = Number(params.noteId);
    const note = await DB.getNote(noteId);

    return { note };
}

export default function Show() {
    const { note } = useLoaderData();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await DB.deleteNote(note.id);
        navigate('/');
    };

    return (
        <div className="container mx-auto px-3 py-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4 capitalize">{ note.title }</h1>
                <p className="text-xs font-medium text-gray-gray12">{ new Date(note.created).toLocaleString() }</p>
                <button
                    onClick={ handleDelete }
                    className=" text-sm font-semibold text-red-red11 hover:text-red-red10 mt-2"
                >
                    Delete Note
                </button>

                <Link
                    to={ `/note/${note.id}/edit` }
                    className="ml-2 text-sm font-semibold text-grass-grass11 hover:text-grass-grass10 mt-2"
                >
                    Edit note
                </Link>
            </div>

            <div
                className="mt-4 prose prose-sm  sm:prose-base lg:prose-lg xl:prose-2xl text-gray-gray11"
                dangerouslySetInnerHTML={ { __html: note.content } } />
        </div>
    );
}