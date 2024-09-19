import { openDB } from 'idb';

export const DB = {
    openDB: async () => {
        return await openDB('note-store', 1, {
            upgrade(db) {
                db.createObjectStore('notes', {
                    keyPath: 'id',
                    autoIncrement: true,
                });
            },
        });
    },

    saveNote: async (note) => {
        const db = await DB.openDB();
        const id = await db.put('notes', note);
        return id;
    },

    getNotes: async () => {
        const db = await DB.openDB();
        return await db.getAll('notes');
    },

    getNote: async (id) => {
        const db = await DB.openDB();
        const note = await db.get('notes', id);
        return note;
    },

    deleteNote: async (id) => {
        const db = await DB.openDB();
        await db.delete('notes', id);
    },
};