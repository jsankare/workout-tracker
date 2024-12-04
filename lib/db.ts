import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface WorkoutDB extends DBSchema {
  exercises: {
    key: string;
    value: {
      id: string;
      name: string;
      description?: string;
      muscleGroups: string[];
      specificMuscles: string[];
      exerciseType: string;
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: { 'by-name': string };
  };
  workouts: {
    key: string;
    value: {
      id: string;
      name: string;
      date: Date;
      duration: number;
      exercises: Array<{
        exerciseId: string;
        sets?: Array<{
          reps?: number;
          weight?: number;
          duration?: number;
          distance?: number;
        }>;
      }>;
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: { 'by-date': Date };
  };
}

let dbPromise: Promise<IDBPDatabase<WorkoutDB>>;

export const initDB = async () => {
  dbPromise = openDB<WorkoutDB>('warrior-workouts', 1, {
    upgrade(db) {
      const exerciseStore = db.createObjectStore('exercises', {
        keyPath: 'id',
      });
      exerciseStore.createIndex('by-name', 'name');

      const workoutStore = db.createObjectStore('workouts', {
        keyPath: 'id',
      });
      workoutStore.createIndex('by-date', 'date');
    },
  });
  return dbPromise;
};

export const getDB = () => {
  if (!dbPromise) {
    throw new Error('Database not initialized. Call initDB first.');
  }
  return dbPromise;
};