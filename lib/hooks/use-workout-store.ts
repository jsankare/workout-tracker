'use client';

import { create } from 'zustand';
import { getDB } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

interface WorkoutSet {
  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;
}

interface WorkoutExercise {
  exerciseId: string;
  sets?: WorkoutSet[];
}

interface Workout {
  id: string;
  name: string;
  date: Date;
  duration: number;
  exercises: WorkoutExercise[];
  createdAt: Date;
  updatedAt: Date;
}

interface WorkoutStore {
  workouts: Workout[];
  currentWorkout: Workout | null;
  loading: boolean;
  error: string | null;
  fetchWorkouts: () => Promise<void>;
  startWorkout: (name: string) => void;
  addExerciseToWorkout: (exerciseId: string) => void;
  updateSet: (exerciseIndex: number, setIndex: number, set: WorkoutSet) => void;
  finishWorkout: () => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  currentWorkout: null,
  loading: false,
  error: null,
  fetchWorkouts: async () => {
    set({ loading: true, error: null });
    try {
      const db = await getDB();
      const workouts = await db.getAll('workouts');
      set({ workouts, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  startWorkout: (name) => {
    const workout: Workout = {
      id: uuidv4(),
      name,
      date: new Date(),
      duration: 0,
      exercises: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set({ currentWorkout: workout });
  },
  addExerciseToWorkout: (exerciseId) => {
    const { currentWorkout } = get();
    if (!currentWorkout) return;
    
    const updatedWorkout = {
      ...currentWorkout,
      exercises: [...currentWorkout.exercises, { exerciseId, sets: [] }],
    };
    set({ currentWorkout: updatedWorkout });
  },
  updateSet: (exerciseIndex, setIndex, set) => {
    const { currentWorkout } = get();
    if (!currentWorkout) return;

    const updatedExercises = [...currentWorkout.exercises];
    const exercise = updatedExercises[exerciseIndex];
    
    if (!exercise.sets) {
      exercise.sets = [];
    }
    
    exercise.sets[setIndex] = set;
    
    set({
      currentWorkout: {
        ...currentWorkout,
        exercises: updatedExercises,
      },
    });
  },
  finishWorkout: async () => {
    const { currentWorkout } = get();
    if (!currentWorkout) return;

    set({ loading: true, error: null });
    try {
      const db = await getDB();
      await db.add('workouts', currentWorkout);
      const workouts = await db.getAll('workouts');
      set({ workouts, currentWorkout: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  deleteWorkout: async (id) => {
    set({ loading: true, error: null });
    try {
      const db = await getDB();
      await db.delete('workouts', id);
      const workouts = await db.getAll('workouts');
      set({ workouts, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));