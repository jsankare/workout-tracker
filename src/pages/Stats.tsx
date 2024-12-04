import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useWorkoutStats } from '../hooks/useWorkoutStats';

export const Stats: React.FC = () => {
  const { totalWorkouts, totalDuration, mostCommonExercise, averageExercisesPerWorkout } = useWorkoutStats();

  const stats = [
    { label: 'Total Workouts', value: totalWorkouts },
    { label: 'Total Minutes', value: totalDuration },
    { label: 'Most Common Exercise', value: mostCommonExercise || 'N/A' },
    { label: 'Avg. Exercises/Workout', value: averageExercisesPerWorkout.toFixed(1) },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Workout Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-surface p-6 rounded-lg">
              <h3 className="text-gray-400 text-sm mb-2">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};