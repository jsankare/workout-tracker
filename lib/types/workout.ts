export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  notes: string;
  isFavorite: boolean;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  duration: number;
}

export interface CompletedWorkout {
  id: string;
  templateId?: string;
  name: string;
  date: string;
  duration: number;
  exercises: CompletedExercise[];
  notes: string;
}

export interface CompletedExercise {
  exerciseId: string;
  sets: ExerciseSet[];
  notes: string;
}

export interface ExerciseSet {
  reps: number;
  weight?: number;
  duration?: number;
}