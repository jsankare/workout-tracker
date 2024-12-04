export interface WorkoutExercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps?: number;
  weight?: number;
  duration?: number;
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  date: string;
  duration: number;
  exercises: WorkoutExercise[];
}