import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { db } from '../lib/db';
import { Workout } from '../types/workout';

export const useWorkoutStats = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalDuration: 0,
    mostCommonExercise: '',
    averageExercisesPerWorkout: 0,
  });

  useEffect(() => {
    const calculateStats = async () => {
      if (!user) return;

      const database = await db;
      const workouts = await database.getAll('workouts') || [];
      const userWorkouts = workouts.filter((w: Workout) => w.userId === user.id);

      if (userWorkouts.length === 0) {
        return;
      }

      // Calculate exercise frequency
      const exerciseFrequency: Record<string, number> = {};
      let totalExercises = 0;

      userWorkouts.forEach((workout: Workout) => {
        workout.exercises.forEach(exercise => {
          exerciseFrequency[exercise.name] = (exerciseFrequency[exercise.name] || 0) + 1;
          totalExercises++;
        });
      });

      // Find most common exercise
      const mostCommonExercise = Object.entries(exerciseFrequency).reduce(
        (a, b) => (b[1] > a[1] ? b : a)
      )[0];

      setStats({
        totalWorkouts: userWorkouts.length,
        totalDuration: userWorkouts.reduce((acc, curr) => acc + curr.duration, 0),
        mostCommonExercise,
        averageExercisesPerWorkout: totalExercises / userWorkouts.length,
      });
    };

    calculateStats();
  }, [user]);

  return stats;
};