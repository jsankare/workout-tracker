export interface WorkoutExercise {
  exerciseId: string;
  name: string;
  category: string;
  sets: {
    id: string;
    weight?: number;    // For strength exercises
    reps?: number;      // For strength/power exercises
    duration?: number;  // For cardio/endurance (in seconds)
    distance?: number;  // For cardio (in meters)
    notes?: string;
  }[];
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  notes?: string;
  exercises: WorkoutExercise[];
  createdAt: number;
  updatedAt: number;
}