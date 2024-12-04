import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Workout } from '../../types/workout';

interface WorkoutChartProps {
  workouts: Workout[];
}

export const WorkoutChart: React.FC<WorkoutChartProps> = ({ workouts }) => {
  const chartData = workouts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(workout => ({
      date: new Date(workout.date).toLocaleDateString(),
      duration: workout.duration,
      exercises: workout.exercises.length,
    }));

  return (
    <div className="bg-surface p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-6">Workout Activity</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis
              yAxisId="left"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              label={{
                value: 'Duration (min)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#9CA3AF' },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              label={{
                value: 'Exercises',
                angle: 90,
                position: 'insideRight',
                style: { fill: '#9CA3AF' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#2A2A2A',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff',
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="duration"
              stroke="#FF6B35"
              strokeWidth={2}
              dot={{ fill: '#FF6B35' }}
              name="Duration"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="exercises"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ fill: '#60A5FA' }}
              name="Exercises"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};