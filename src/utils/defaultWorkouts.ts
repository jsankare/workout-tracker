import { v4 as uuidv4 } from 'uuid';
import { defaultExercises } from './defaultExercises';
import { Workout } from '../types/workout';

export const createDefaultWorkouts = (exercises: any[]): Omit<Workout, 'id' | 'userId'>[] => [
  {
    name: 'Full Body Strength',
    date: new Date().toISOString().split('T')[0],
    duration: 60,
    exercises: [
      {
        exerciseId: exercises.find(e => e.name === 'Push-ups')?.id || '',
        name: 'Push-ups',
        sets: 3,
        reps: 12,
      },
      {
        exerciseId: exercises.find(e => e.name === 'Squats')?.id || '',
        name: 'Squats',
        sets: 4,
        reps: 15,
      },
      {
        exerciseId: exercises.find(e => e.name === 'Pull-ups')?.id || '',
        name: 'Pull-ups',
        sets: 3,
        reps: 8,
      },
      {
        exerciseId: exercises.find(e => e.name === 'Plank')?.id || '',
        name: 'Plank',
        sets: 3,
        duration: 60,
      },
    ],
  },
  {
    name: 'HIIT Cardio',
    date: new Date().toISOString().split('T')[0],
    duration: 30,
    exercises: [
      {
        exerciseId: exercises.find(e => e.name === 'Burpees')?.id || '',
        name: 'Burpees',
        sets: 4,
        reps: 15,
      },
      {
        exerciseId: exercises.find(e => e.name === 'Running')?.id || '',
        name: 'Running',
        sets: 1,
        duration: 600,
      },
      {
        exerciseId: exercises.find(e => e.name === 'Push-ups')?.id || '',
        name: 'Push-ups',
        sets: 3,
        reps: 20,
      },
    ],
  },
  {
    name: 'Strength Training',
    date: new Date().toISOString().split('T')[0],
    duration: 75,
    exercises: [
      {
        exerciseId: exercises.find(e => e.name === 'Bench Press')?.id || '',
        name: 'Bench Press',
        sets: 4,
        reps: 8,
        weight: 60,
      },
      {
        exerciseId: exercises.find(e => e.name === 'Deadlift')?.id || '',
        name: 'Deadlift',
        sets: 4,
        reps: 6,
        weight: 100,
      },
      {
        exerciseId: exercises.find(e => e.name === 'Squats')?.id || '',
        name: 'Squats',
        sets: 4,
        reps: 10,
        weight: 80,
      },
    ],
  },
];

export const initializeDefaultWorkouts = async (db: any) => {
  const workouts = await db.getAll('workouts');
  const exercises = await db.getAll('exercises');
  
  if (workouts.length === 0) {
    const defaultWorkouts = createDefaultWorkouts(exercises);
    for (const workout of defaultWorkouts) {
      await db.add('workouts', { ...workout, id: uuidv4(), userId: 'template' });
    }
  }
};