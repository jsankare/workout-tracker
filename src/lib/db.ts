import { openDB, DBSchema } from 'idb';
import { initializeDefaultExercises } from '../utils/defaultExercises';
import { initializeDefaultWorkouts } from '../utils/defaultWorkouts';

interface WorkoutDB extends DBSchema {
  users: {
    key: string;
    value: {
      id: string;
      email: string;
      name: string;
      password: string;
      height?: number;
      weight?: number;
      age?: number;
      gender?: 'male' | 'female';
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
        exerciseId: string;
        name: string;
        sets: number;
        reps?: number;
        weight?: number;
        duration?: number;
        notes?: string;
      }>;
    };
  };
  exercises: {
    key: string;
    value: {
      id: string;
      name: string;
      type: string;
      muscleGroups: string[];
      muscles: string[];
      description?: string;
      instructions?: string;
      caloriesPerMinute?: number;
    };
  };
}

const DB_NAME = 'picards-workout-tracker';
const DB_VERSION = 3;

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
      if (oldVersion < 3) {
        db.createObjectStore('exercises', { keyPath: 'id' });
      }
    },
  });

  // Initialize default data
  await initializeDefaultExercises(db);
  await initializeDefaultWorkouts(db);

  return db;
};

export const db = initDB();