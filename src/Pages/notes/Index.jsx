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

function NoNoteGreet() {
    return (
        <div className="flex  justify-center w-full col-span-5 relative ">
            <div className="fixed right-[30vw] -bottom-7  flex justify-center items-end z-10">
                <img src="/scandi02.png" alt="background" className="w-auto h-auto max-w-xs max-h-xs mb-0" />
            </div>
            <div className="fixed   md:z-10 left-[0vw] md:left-[30vw] -bottom-7 flex justify-center items-end ">
                <img src="/scandi.png" alt="background" className="w-auto h-auto max-w-xs max-h-xs mb-0" />
            </div>
            <div className="fixed right-[12vw] md:right-[22vw] -bottom-7  flex justify-center items-end z-10">
                <img src="/scandi04.png" alt="background" className="w-auto h-auto max-w-xs max-h-xs mb-0" />
            </div>
            <div className="fixed   md:z-10 left-[12vw] md:left-[36vw] -bottom-7 flex justify-center items-end ">
                <img src="/scandi03.png" alt="background" className="w-auto h-auto max-w-xs max-h-xs mb-0" />
            </div>


            <section className="mt-2 relative bg-yellow-yellow5 rounded-lg  min-h-20 opacity-90 px-2 md:px-4 flex justify-center items-center text-center z-10">
                <div className="absolute opacity-90 -top-5 -left-4 sm:-top-7 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 ">
                    <img src="/orange-maple-leaf.png" alt="background" className="w-full h-full object-contain z-0" />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-center text-base sm:text-xl md:text-2xl font-bold text-sand-800">
                        No notes found. Create a new note to get started.
                    </p>
                </div>
            </section>
        </div>
    )
}