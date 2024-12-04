import { openDB, DBSchema } from 'idb';

interface WorkoutDB extends DBSchema {
  users: {
    key: string;
    value: {
      id: string;
      email: string;
      name: string;
    };
  };
  sessions: {
    key: string;
    value: {
      token: string;
      expiresAt: number;
    };
  };
}

const DB_NAME = 'picards-workout-tracker';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB<WorkoutDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('users', { keyPath: 'id' });
      db.createObjectStore('sessions', { keyPath: 'token' });
    },
  });
  return db;
};

export const db = initDB();