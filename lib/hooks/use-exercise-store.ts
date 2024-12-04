'use client';

import { create } from 'zustand';
import { getDB } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscleGroups: string[];
  specificMuscles: string[];
  exerciseType: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ExerciseStore {
  exercises: Exercise[];
  loading: boolean;
  error: string | null;
  fetchExercises: () => Promise<void>;
  addExercise: (exercise: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateExercise: (id: string, exercise: Partial<Exercise>) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
}

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: [],
  loading: false,
  error: null,
  fetchExercises: async () => {
    set({ loading: true, error: null });
    try {
      const db = await getDB();
      const exercises = await db.getAll('exercises');
      set({ exercises, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  addExercise: async (exercise) => {
    set({ loading: true, error: null });
    try {
      const db = await getDB();
      const newExercise = {
        ...exercise,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.add('exercises', newExercise);
      const exercises = await db.getAll('exercises');
      set({ exercises, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  updateExercise: async (id, exercise) => {
    set({ loading: true, error: null });
    try {
      const db = await getDB();
      const existingExercise = await db.get('exercises', id);
      if (!existingExercise) {
        throw new Error('Exercise not found');
      }
      const updatedExercise = {
        ...existingExercise,
        ...exercise,
        updatedAt: new Date(),
      };
      await db.put('exercises', updatedExercise);
      const exercises = await db.getAll('exercises');
      set({ exercises, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  deleteExercise: async (id) => {
    set({ loading: true, error: null });
    try {
      const db = await getDB();
      await db.delete('exercises', id);
      const exercises = await db.getAll('exercises');
      set({ exercises, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));