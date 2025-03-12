import { openDB } from "idb";

const DB_NAME = `${process.env.NEXT_PUBLIC_INDEX_DB_NAME}`;
const STORE_NAME = `${process.env.NEXT_PUBLIC_INDEX_DB_STORE_NAME}`;

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function setItem(key: string, value: any) {
  const db = await getDB();
  return db.put(STORE_NAME, value, key);
}

export async function getItem<T>(key: string): Promise<T | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, key);
}

export async function clearStore() {
  const db = await getDB();
  return db.clear(STORE_NAME);
}
