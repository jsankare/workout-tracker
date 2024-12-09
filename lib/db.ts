import { openDB, DBSchema } from 'idb';

interface WorkoutDB extends DBSchema {
  exercises: {
    key: string;
    value: {
      id: string;
      name: string;
      category: 'strength' | 'cardio' | 'flexibility';
      equipment: string[];
      description: string;
      targetMuscles: string[];
      defaultSets: number;
      defaultReps: number;
      defaultDuration: number;
    };
  };
  workoutTemplates: {
    key: string;
    value: {
      id: string;
      name: string;
      exercises: Array<{
        exerciseId: string;
        sets: number;
        reps: number;
        duration: number;
      }>;
      notes: string;
      isFavorite: boolean;
    };
  };
  completedWorkouts: {
    key: string;
    value: {
      id: string;
      templateId?: string;
      name: string;
      date: string;
      duration: number;
      exercises: Array<{
        exerciseId: string;
        sets: Array<{
          reps: number;
          weight?: number;
          duration?: number;
        }>;
        notes: string;
      }>;
      notes: string;
    };
  };
}

export const initDB = async () => {
  const db = await openDB<WorkoutDB>('workout-tracker', 1, {
    upgrade(db) {
      db.createObjectStore('exercises', { keyPath: 'id' });
      db.createObjectStore('workoutTemplates', { keyPath: 'id' });
      db.createObjectStore('completedWorkouts', { keyPath: 'id' });
    },
  });
  return db;
};

export const getDB = () => initDB();