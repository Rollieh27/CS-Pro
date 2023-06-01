import { openDB } from 'idb';

const initdb = async () =>
  openDB('cspro', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('cspro')) {
        console.log('CS Pro database already exists');
        return;
      }
      db.createObjectStore('cspro', { keyPath: 'id', autoIncrement: true });
      console.log('CS Pro database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb();
  const transaction = db.transaction('cspro', 'readwrite');
  const store = transaction.objectStore('cspro');
  await store.add(content);
  await transaction.complete;
  console.log('Content added to the database');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initdb();
  const transaction = db.transaction('cspro', 'readonly');
  const store = transaction.objectStore('cspro');
  const content = await store.getAll();
  await transaction.complete;
  return content;
};

initdb();
