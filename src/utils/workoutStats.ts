import { Workout } from '../types/workout';

interface WorkoutStats {
  totalWeight: number;
  estimatedCalories: number;
}

export const calculateWorkoutStats = (workout: Workout): WorkoutStats => {
  let totalWeight = 0;
  let estimatedCalories = 0;

  // Calculate total weight lifted
  workout.exercises.forEach(exercise => {
    if (exercise.weight && exercise.sets && exercise.reps) {
      totalWeight += exercise.weight * exercise.sets * exercise.reps;
    }
  });

  // Estimate calories burned (basic calculation)
  // Using MET values: Light = 3, Moderate = 5, Vigorous = 7
  const avgMET = 5;
  const avgWeight = 70; // Default weight if user hasn't set it
  estimatedCalories = Math.round((workout.duration * avgMET * 3.5 * avgWeight) / 200);

  return {
    totalWeight,
    estimatedCalories,
  };
};