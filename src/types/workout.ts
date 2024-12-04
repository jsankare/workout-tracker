export interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  exercises: Exercise[];
}