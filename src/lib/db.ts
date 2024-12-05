import { openDB, DBSchema } from 'idb';
import { Exercise, ExerciseType, MuscleGroup, Muscle } from '../types/exercise';
import { Workout } from '../types/workout';
import { User } from '../types/auth';
import { initializeDefaultExercises } from '../utils/defaultExercises';
import { initializeDefaultWorkouts } from '../utils/defaultWorkouts';

interface WorkoutDB extends DBSchema {
  users: {
    key: string;
    value: User & {
      password: string;
    };
  };
  sessions: {
    key: string;
    value: {
      token: string;
      userId: string;
      expiresAt: number;
    };
  };
  workouts: {
    key: string;
    value: Workout;
  };
  exercises: {
    key: string;
    value: Exercise;
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