import { WorkoutTemplate, WorkoutExercise } from '../types/workout';

export function generateWorkoutId(): string {
  return `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function validateWorkoutTemplate(template: Partial<WorkoutTemplate>): string[] {
  const errors: string[] = [];

  if (!template.name?.trim()) {
    errors.push('Workout name is required');
  }

  if (!template.exercises?.length) {
    errors.push('At least one exercise is required');
  }

  return errors;
}

export function calculateEstimatedDuration(exercises: WorkoutExercise[]): number {
  // Estimate 2 minutes per set plus 1 minute rest between exercises
  return exercises.reduce((total, exercise) => {
    return total + (exercise.sets * 2) + 1;
  }, 0);
}