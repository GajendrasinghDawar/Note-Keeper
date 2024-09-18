import { openDB } from 'idb';

// IndexedDB setup and utility functions
export const DB = {
    openDB: async () => {
        return await openDB('todo-store', 1, {
            upgrade(db) {
                db.createObjectStore('todos', {
                    keyPath: 'id',
                    autoIncrement: true,
                });
            },
        });
    },
    getTodos: async () => {
        const db = await DB.openDB();
        return await db.getAll('todos');
    },
    getTod: async (id) => {
        const db = await DB.openDB();
        return await db.get('todos', id);
    },
    saveTodo: async (todo) => {
        const db = await DB.openDB();
        await db.put('todos', todo); // db.put takes storeName and value
    },
    deleteTodo: async (id) => {
        const db = await DB.openDB();
        await db.delete('todos', id); // db.delete takes storeName and key
    },
};