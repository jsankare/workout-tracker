import { Workout } from '../types/workout';
import { Exercise } from '../types/exercise';
import { WorkoutStats } from '../types/stats';

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

export function calculateBMR(weight: number, height: number, age: number, isMale: boolean): number {
  // Mifflin-St Jeor Equation
  const bmr = 10 * weight + 6.25 * height - 5 * age + (isMale ? 5 : -161);
  return Math.round(bmr);
}

export function calculateWorkoutStats(workouts: Workout[], exercises: Exercise[]): WorkoutStats {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Initialize stats object
  const stats: WorkoutStats = {
    totalWorkouts: workouts.length,
    workoutsByCategory: {},
    mostFrequentExercises: [],
    averageWorkoutsPerWeek: 0,
    totalVolume: 0,
    personalBests: {},
  };

  // Exercise frequency counter
  const exerciseFrequency: Record<string, number> = {};
  
  // Calculate stats from workouts
  workouts.forEach(workout => {
    // Count exercises
    workout.exercises.forEach(exercise => {
      exerciseFrequency[exercise.name] = (exerciseFrequency[exercise.name] || 0) + 1;
      
      // Calculate volume for strength exercises
      exercise.sets.forEach(set => {
        if (set.weight && set.reps) {
          stats.totalVolume += set.weight * set.reps;
        }
      });

      // Track personal bests
      exercise.sets.forEach(set => {
        if (set.weight) {
          const currentBest = stats.personalBests[exercise.name];
          if (!currentBest || set.weight > currentBest.value) {
            stats.personalBests[exercise.name] = {
              exercise: exercise.name,
              value: set.weight,
              date: workout.date,
            };
          }
        }
      });

      // Count by category
      const exerciseData = exercises.find(e => e.id === exercise.exerciseId);
      if (exerciseData) {
        stats.workoutsByCategory[exerciseData.category] = 
          (stats.workoutsByCategory[exerciseData.category] || 0) + 1;
      }
    });
  });

  // Calculate most frequent exercises
  stats.mostFrequentExercises = Object.entries(exerciseFrequency)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Calculate average workouts per week
  const oldestWorkout = workouts.reduce((oldest, current) => 
    new Date(current.date) < new Date(oldest.date) ? current : oldest
  , workouts[0]);

  if (oldestWorkout) {
    const totalWeeks = Math.max(
      1,
      Math.ceil((now.getTime() - new Date(oldestWorkout.date).getTime()) / (7 * 24 * 60 * 60 * 1000))
    );
    stats.averageWorkoutsPerWeek = Number((workouts.length / totalWeeks).toFixed(1));
  }

  return stats;
}