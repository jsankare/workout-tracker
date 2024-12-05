import React from 'react';
import { Activity, Dumbbell, Clock, Flame } from 'lucide-react';
import { Workout } from '../../types/workout';
import { calculateWorkoutStats } from '../../utils/workoutStats';
import { Tooltip } from '../ui/Tooltip';

interface WorkoutStatsProps {
  workout: Workout;
}

export const WorkoutStats: React.FC<WorkoutStatsProps> = ({ workout }) => {
  const stats = calculateWorkoutStats(workout);

  const statItems = [
    {
      icon: Clock,
      label: 'Duration',
      value: `${workout.duration} min`,
      color: 'text-blue-400',
    },
    {
      icon: Activity,
      label: 'Exercises',
      value: workout.exercises.length.toString(),
      color: 'text-green-400',
    },
    {
      icon: Dumbbell,
      label: 'Total Weight',
      value: `${stats.totalWeight} kg`,
      color: 'text-purple-400',
    },
    {
      icon: Flame,
      label: 'Calories',
      value: `${stats.estimatedCalories} kcal`,
      color: 'text-orange-400',
    },
  ];

  return (
    <div className="flex justify-between items-center bg-background/40 rounded-lg px-4 py-3">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Tooltip key={index} content={item.label}>
            <div className="flex-col items-center justify-center gap-2">
              <Icon className={`w-5 h-5 ${item.color}`} />
              <span className="text-white font-medium">{item.value}</span>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};