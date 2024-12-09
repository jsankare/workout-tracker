import { Exercise } from '../types/exercise';

export function generateExerciseId(): string {
  return `exercise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function validateExercise(exercise: Partial<Exercise>): string[] {
  const errors: string[] = [];

  if (!exercise.name?.trim()) {
    errors.push('Exercise name is required');
  }

  if (!exercise.category) {
    errors.push('Category is required');
  }

  if (!exercise.targetMuscles?.length) {
    errors.push('At least one target muscle group is required');
  }

  if (exercise.defaultSets !== undefined && exercise.defaultSets < 1) {
    errors.push('Default sets must be at least 1');
  }

  if (exercise.defaultReps !== undefined && exercise.defaultReps < 1) {
    errors.push('Default reps must be at least 1');
  }

  return errors;
}