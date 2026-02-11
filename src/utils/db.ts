import { openDB, IDBPDatabase } from 'idb'
import type { Note } from '@/types'

export const DB = {
  openDB: async (): Promise<IDBPDatabase> => {
    return await openDB('note-store', 1, {
      upgrade(db) {
        db.createObjectStore('notes', {
          keyPath: 'id',
          autoIncrement: true,
        })
      },
    })
  },

  saveNote: async (note: Note): Promise<number> => {
    const db = await DB.openDB()
    const id = await db.put('notes', note)
    return id as number
  },

  getNotes: async (): Promise<Note[]> => {
    const db = await DB.openDB()
    return await db.getAll('notes')
  },

  getNote: async (id: number): Promise<Note | undefined> => {
    const db = await DB.openDB()
    const note = await db.get('notes', id)
    return note
  },

  deleteNote: async (id: number): Promise<void> => {
    const db = await DB.openDB()
    await db.delete('notes', id)
  },
}
