export interface PersonalStats {
  id: string;
  date: string;
  weight: number;
  height: number;
  age: number;
  bodyFatPercentage?: number;
  notes?: string;
  createdAt: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  workoutsByCategory: Record<string, number>;
  mostFrequentExercises: Array<{
    name: string;
    count: number;
  }>;
  averageWorkoutsPerWeek: number;
  totalVolume: number; // Total weight lifted
  personalBests: Record<string, {
    exercise: string;
    value: number;
    date: string;
  }>;
}