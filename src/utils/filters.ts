import { Exercise } from '../types/exercise';
import { Workout } from '../types/workout';

export function filterExercises(
  exercises: Exercise[],
  filters: {
    category?: string;
    muscleGroup?: string;
    muscle?: string;
  }
): Exercise[] {
  return exercises.filter((exercise) => {
    if (filters.category && exercise.category !== filters.category) return false;
    if (filters.muscleGroup && !exercise.muscleGroups.includes(filters.muscleGroup as any)) return false;
    if (filters.muscle && !exercise.muscles.includes(filters.muscle as any)) return false;
    return true;
  });
}

export function sortExercises(
  exercises: Exercise[],
  sortBy: string,
  direction: 'asc' | 'desc'
): Exercise[] {
  const sorted = [...exercises].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'date':
        return a.createdAt - b.createdAt;
      default:
        return 0;
    }
  });

  return direction === 'asc' ? sorted : sorted.reverse();
}

export function filterWorkouts(
  workouts: Workout[],
  filters: {
    dateRange?: { start: string; end: string };
    exerciseId?: string;
    hasNotes?: boolean;
  }
): Workout[] {
  return workouts.filter((workout) => {
    if (filters.dateRange) {
      const workoutDate = new Date(workout.date);
      const start = new Date(filters.dateRange.start);
      const end = new Date(filters.dateRange.end);
      if (workoutDate < start || workoutDate > end) return false;
    }
    if (filters.exerciseId && !workout.exercises.some(e => e.exerciseId === filters.exerciseId)) {
      return false;
    }
    if (filters.hasNotes === true && !workout.notes) return false;
    if (filters.hasNotes === false && workout.notes) return false;
    return true;
  });
}

export function sortWorkouts(
  workouts: Workout[],
  sortBy: string,
  direction: 'asc' | 'desc'
): Workout[] {
  const sorted = [...workouts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'exercises':
        return a.exercises.length - b.exercises.length;
      default:
        return 0;
    }
  });

  return direction === 'asc' ? sorted : sorted.reverse();
}