import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { useWorkoutStats } from '../hooks/useWorkoutStats';
import { WorkoutChart } from '../components/stats/WorkoutChart';
import { WeightChart } from '../components/stats/WeightChart';
import { 
  Activity, 
  Calendar, 
  Clock, 
  Dumbbell, 
  Flame, 
  Scale, 
  TrendingUp, 
  Timer 
} from 'lucide-react';
import { db } from '../lib/db';
import { Workout } from '../types/workout';

export const Stats: React.FC = () => {
  const stats = useWorkoutStats();
  const [workouts, setWorkouts] = React.useState<Workout[]>([]);

  React.useEffect(() => {
    const loadWorkouts = async () => {
      const database = await db;
      const allWorkouts = await database.getAll('workouts') || [];
      setWorkouts(allWorkouts);
    };
    loadWorkouts();
  }, []);

  const statCards = [
    { 
      label: 'Total Workouts',
      value: stats.totalWorkouts,
      icon: Calendar,
      color: 'text-blue-500'
    },
    { 
      label: 'Total Duration',
      value: `${stats.totalDuration} min`,
      icon: Clock,
      color: 'text-green-500'
    },
    { 
      label: 'Calories Burned',
      value: `${stats.totalCaloriesBurned} kcal`,
      icon: Flame,
      color: 'text-red-500'
    },
    { 
      label: 'Most Common Exercise',
      value: stats.mostCommonExercise || 'N/A',
      icon: Activity,
      color: 'text-purple-500'
    },
    { 
      label: 'Avg. Exercises/Workout',
      value: stats.averageExercisesPerWorkout.toFixed(1),
      icon: TrendingUp,
      color: 'text-yellow-500'
    },
    { 
      label: 'Total Weight Lifted',
      value: `${stats.totalWeightLifted} kg`,
      icon: Dumbbell,
      color: 'text-indigo-500'
    },
    { 
      label: 'Most Used Weight',
      value: `${stats.mostUsedWeight} kg`,
      icon: Scale,
      color: 'text-pink-500'
    },
    { 
      label: 'Avg. Workout Duration',
      value: `${Math.round(stats.averageWorkoutDuration)} min`,
      icon: Timer,
      color: 'text-cyan-500'
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Workout Statistics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-surface p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <Icon className={`w-5 h-5 ${stat.color} mr-2`} />
                  <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <WorkoutChart workouts={workouts} />
          <WeightChart />
        </div>

        <div className="bg-surface p-6 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Workout Duration Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Shortest Workout</h3>
              <p className="text-xl font-bold text-white">{stats.shortestWorkout} min</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Average Duration</h3>
              <p className="text-xl font-bold text-white">
                {Math.round(stats.averageWorkoutDuration)} min
              </p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm mb-1">Longest Workout</h3>
              <p className="text-xl font-bold text-white">{stats.longestWorkout} min</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};