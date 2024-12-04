import { openDB, DBSchema } from 'idb';

interface WorkoutDB extends DBSchema {
  users: {
    key: string;
    value: {
      id: string;
      email: string;
      name: string;
      password: string;
    };
  };
  sessions: {
    key: string;
    value: {
      token: string;
      expiresAt: number;
    };
  };
  workouts: {
    key: string;
    value: {
      id: string;
      userId: string;
      name: string;
      date: string;
      duration: number;
      exercises: Array<{
        name: string;
        sets: number;
        reps: number;
      }>;
    };
  };
}

const DB_NAME = 'picards-workout-tracker';
const DB_VERSION = 2;

export const initDB = async () => {
  const db = await openDB<WorkoutDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        db.createObjectStore('users', { keyPath: 'email' });
        db.createObjectStore('sessions', { keyPath: 'token' });
      }
      if (oldVersion < 2) {
        db.createObjectStore('workouts', { keyPath: 'id' });
      }
    },
  });
  return db;
};

export const db = initDB();