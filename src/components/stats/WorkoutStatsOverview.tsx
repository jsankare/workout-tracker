import { WorkoutStats } from '../../types/stats';
import { BarChart, Activity, Trophy, Dumbbell } from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface WorkoutStatsOverviewProps {
  stats: WorkoutStats;
}

export default function WorkoutStatsOverview({ stats }: WorkoutStatsOverviewProps) {
  const categoryData = Object.entries(stats.workoutsByCategory).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Activity className="mr-2 text-yellow-500" />
            <h3 className="text-lg font-semibold">Total Workouts</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalWorkouts}</p>
          <p className="text-sm text-gray-400">
            Avg. {stats.averageWorkoutsPerWeek} per week
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Dumbbell className="mr-2 text-yellow-500" />
            <h3 className="text-lg font-semibold">Total Volume</h3>
          </div>
          <p className="text-3xl font-bold">{stats.totalVolume.toLocaleString()}</p>
          <p className="text-sm text-gray-400">kg lifted</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Trophy className="mr-2 text-yellow-500" />
            <h3 className="text-lg font-semibold">Personal Bests</h3>
          </div>
          <div className="space-y-2">
            {Object.values(stats.personalBests).slice(0, 3).map((pb) => (
              <div key={pb.exercise} className="text-sm">
                <span className="font-medium">{pb.exercise}:</span>{' '}
                <span className="text-yellow-500">{pb.value}kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-6">
          <BarChart className="mr-2 text-yellow-500" />
          <h3 className="text-lg font-semibold">Workouts by Category</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.375rem',
                }}
              />
              <Bar dataKey="value" fill="#EAB308" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Most Frequent Exercises</h3>
        <div className="space-y-4">
          {stats.mostFrequentExercises.map((exercise) => (
            <div key={exercise.name} className="flex items-center">
              <div className="flex-1">
                <p className="font-medium">{exercise.name}</p>
              </div>
              <div className="ml-4">
                <span className="px-2 py-1 bg-gray-700 rounded text-sm">
                  {exercise.count} times
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}