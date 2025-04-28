import { Memo } from "../types/memo";
import { SqliteStorage } from "./sqliteStorage";

type MemoStorageType = {
    createMemosTable: () => Promise<void>;
    saveMemo: (param: Memo) => Promise<void>;
    readMemos: () => Promise<Memo[]>;
    readMemoById: (id: string) => Promise<Memo | null>;
    deleteMemoById: (id: string) => Promise<void>;
}

export const MemoStorage: MemoStorageType = {
    createMemosTable: async () => {
        try {
            await SqliteStorage.createTable('memos', {
                id: 'INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL',
                title: 'TEXT NOT NULL',
                body: 'TEXT NOT NULL',
                ref: 'TEXT NOT NULL',
            });
        } catch (error) {
            console.error(error)
        }
    },
    saveMemo: async (param: Memo) => {
        try {
            await SqliteStorage.saveData('memos', param);
        } catch (error) {
            console.error(error)
        }
    },
    readMemos: async (): Promise<Memo[]> => {
        try {
            const rows = await SqliteStorage.readData('memos');
            const memos: Memo[] = rows.map((row: any) => ({
                id: row.id,
                title: row.title,
                body: row.body,
                ref: row.ref,
            }))
            return memos;
        } catch (error) {
            console.error(error)
            return [];
        }
    },
    readMemoById: async (id: string): Promise<Memo | null> => {
        try {
            const rows = await SqliteStorage.readData('memos', 'id = ?', [id]);
            if (rows.length === 0) {
                console.warn(`No memo found with id: ${id}`);
                return null;
            }
            const row = rows[0];
            return row;
        } catch (error) {
            console.error(error)
            return null;
        }
    },
    deleteMemoById: async (id: string) => {
        try {
            await SqliteStorage.deleteData('memos', 'id = ?', [id]);
        } catch (error) {
            console.error(error);
        }
    }
}