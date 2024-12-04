import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { db } from '../lib/db';
import { Workout } from '../types/workout';

interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  totalCaloriesBurned: number;
  mostCommonExercise: string;
  averageExercisesPerWorkout: number;
  totalWeightLifted: number;
  mostUsedWeight: number;
  longestWorkout: number;
  shortestWorkout: number;
  averageWorkoutDuration: number;
}

export const useWorkoutStats = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<WorkoutStats>({
    totalWorkouts: 0,
    totalDuration: 0,
    totalCaloriesBurned: 0,
    mostCommonExercise: '',
    averageExercisesPerWorkout: 0,
    totalWeightLifted: 0,
    mostUsedWeight: 0,
    longestWorkout: 0,
    shortestWorkout: 0,
    averageWorkoutDuration: 0,
  });

  useEffect(() => {
    const calculateStats = async () => {
      if (!user) return;

      const database = await db;
      const workouts = await database.getAll('workouts') || [];
      const exercises = await database.getAll('exercises') || [];
      const userWorkouts = workouts.filter((w: Workout) => w.userId === user.id);

      if (userWorkouts.length === 0) {
        return;
      }

      // Exercise frequency and weight tracking
      const exerciseFrequency: Record<string, number> = {};
      const weightFrequency: Record<number, number> = {};
      let totalExercises = 0;
      let totalWeight = 0;
      let totalCalories = 0;

      userWorkouts.forEach((workout: Workout) => {
        workout.exercises.forEach(exercise => {
          // Exercise frequency
          exerciseFrequency[exercise.name] = (exerciseFrequency[exercise.name] || 0) + 1;
          totalExercises++;

          // Weight tracking
          if (exercise.weight) {
            const totalExerciseWeight = exercise.weight * exercise.sets * (exercise.reps || 1);
            totalWeight += totalExerciseWeight;
            weightFrequency[exercise.weight] = (weightFrequency[exercise.weight] || 0) + 1;
          }

          // Calories calculation
          const exerciseData = exercises.find(e => e.id === exercise.exerciseId);
          if (exerciseData?.caloriesPerMinute) {
            const exerciseDuration = exercise.duration || 
              (exercise.sets * (exercise.reps || 1) * 3); // Estimate 3 seconds per rep
            totalCalories += (exerciseDuration / 60) * exerciseData.caloriesPerMinute;
          }
        });
      });

      // Find most common exercise
      const mostCommonExercise = Object.entries(exerciseFrequency).reduce(
        (a, b) => (b[1] > a[1] ? b : a)
      )[0];

      // Find most used weight
      const mostUsedWeight = Object.entries(weightFrequency).reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        ['0', 0]
      )[0];

      // Workout duration stats
      const durations = userWorkouts.map(w => w.duration);
      const totalDuration = durations.reduce((acc, curr) => acc + curr, 0);

      setStats({
        totalWorkouts: userWorkouts.length,
        totalDuration,
        totalCaloriesBurned: Math.round(totalCalories),
        mostCommonExercise,
        averageExercisesPerWorkout: totalExercises / userWorkouts.length,
        totalWeightLifted: totalWeight,
        mostUsedWeight: Number(mostUsedWeight),
        longestWorkout: Math.max(...durations),
        shortestWorkout: Math.min(...durations),
        averageWorkoutDuration: totalDuration / userWorkouts.length,
      });
    };

    calculateStats();
  }, [user]);

  return stats;
};