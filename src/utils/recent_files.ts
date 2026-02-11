import { openDB } from 'idb'

export interface RecentFile {
  /** The file name, used as the primary key */
  fileName: string
  /** First ~200 chars of content for preview */
  preview: string
  /** Timestamp of last open */
  lastOpened: number
  /** Stored FileSystemFileHandle for reopening (Chromium only) */
  handle?: FileSystemFileHandle
}

const DB_NAME = 'viewer-store'
const DB_VERSION = 1
const STORE_NAME = 'recent-files'
const MAX_RECENT = 10
const PREVIEW_LENGTH = 200

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'fileName' })
        store.createIndex('by-date', 'lastOpened')
      }
    },
  })
}

export const RecentFilesDB = {
  /** Add or update a recent file entry */
  async track(
    fileName: string,
    content: string,
    handle?: FileSystemFileHandle | null
  ): Promise<void> {
    const db = await getDB()
    const entry: RecentFile = {
      fileName,
      preview: content.slice(0, PREVIEW_LENGTH),
      lastOpened: Date.now(),
      ...(handle ? { handle } : {}),
    }
    await db.put(STORE_NAME, entry)

    // Prune oldest entries if over the limit
    const all = await db.getAllFromIndex(STORE_NAME, 'by-date')
    if (all.length > MAX_RECENT) {
      const toDelete = all.slice(0, all.length - MAX_RECENT)
      const tx = db.transaction(STORE_NAME, 'readwrite')
      for (const entry of toDelete) {
        await tx.store.delete(entry.fileName)
      }
      await tx.done
    }
  },

  /** Get all recent files, newest first */
  async getAll(): Promise<RecentFile[]> {
    const db = await getDB()
    const all = await db.getAllFromIndex(STORE_NAME, 'by-date')
    return all.reverse()
  },

  /** Remove a single entry */
  async remove(fileName: string): Promise<void> {
    const db = await getDB()
    await db.delete(STORE_NAME, fileName)
  },

  /** Clear all recent files */
  async clear(): Promise<void> {
    const db = await getDB()
    await db.clear(STORE_NAME)
  },
}
