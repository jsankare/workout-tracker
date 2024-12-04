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
import { useAuthStore } from '../../store/authStore';

interface WeightRecord {
  date: string;
  weight: number;
}

export const WeightChart: React.FC = () => {
  const { user } = useAuthStore();
  const [weightHistory, setWeightHistory] = React.useState<WeightRecord[]>([]);

  React.useEffect(() => {
    // In a real app, you would fetch this from your database
    // For now, we'll use mock data if the user has a weight set
    if (user?.weight) {
      const today = new Date();
      const mockData: WeightRecord[] = Array.from({ length: 10 }).map((_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (9 - i));
        return {
          date: date.toLocaleDateString(),
          weight: user.weight! + (Math.random() * 2 - 1), // Random fluctuation ±1kg
        };
      });
      setWeightHistory(mockData);
    }
  }, [user]);

  if (!weightHistory.length) {
    return null;
  }

  return (
    <div className="bg-surface p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-6">Weight Progress</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3A3A3A" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              domain={['dataMin - 1', 'dataMax + 1']}
              label={{
                value: 'Weight (kg)',
                angle: -90,
                position: 'insideLeft',
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
              type="monotone"
              dataKey="weight"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981' }}
              name="Weight"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};