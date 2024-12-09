"use client";

import { useEffect } from 'react';
import { useIndexedDB } from './use-indexeddb';
import { templateExercises } from '../data/template-exercises';
import { Exercise } from '../types/exercise';

export function useTemplateExercises() {
  const { data: exercises, loading, addItem } = useIndexedDB<Exercise[]>('exercises');

  useEffect(() => {
    const initializeTemplateExercises = async () => {
      if (!loading && (!exercises || exercises.length === 0)) {
        for (const exercise of templateExercises) {
          await addItem(exercise);
        }
      }
    };

    initializeTemplateExercises();
  }, [loading, exercises, addItem]);

  return { exercises, loading };
}