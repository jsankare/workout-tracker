import { PersonalStats } from '../../types/stats';
import { calculateBMI, calculateBMR } from '../../utils/statsCalculator';
import { Activity, Weight, Ruler, Calendar } from 'lucide-react';

interface StatsOverviewProps {
  latestStats: PersonalStats;
}

export default function StatsOverview({ latestStats }: StatsOverviewProps) {
  const bmi = calculateBMI(latestStats.weight, latestStats.height);
  const bmr = calculateBMR(latestStats.weight, latestStats.height, latestStats.age, true); // Assuming male for now

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-400' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-400' };
    return { category: 'Obese', color: 'text-red-400' };
  };

  const bmiStatus = getBMICategory(bmi);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Weight className="mr-2 text-yellow-500" />
          <h3 className="text-lg font-semibold">Weight</h3>
        </div>
        <p className="text-3xl font-bold">{latestStats.weight} kg</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Ruler className="mr-2 text-yellow-500" />
          <h3 className="text-lg font-semibold">Height</h3>
        </div>
        <p className="text-3xl font-bold">{latestStats.height} cm</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Activity className="mr-2 text-yellow-500" />
          <h3 className="text-lg font-semibold">BMI</h3>
        </div>
        <p className="text-3xl font-bold">{bmi}</p>
        <p className={`text-sm ${bmiStatus.color}`}>{bmiStatus.category}</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Calendar className="mr-2 text-yellow-500" />
          <h3 className="text-lg font-semibold">BMR</h3>
        </div>
        <p className="text-3xl font-bold">{bmr}</p>
        <p className="text-sm text-gray-400">calories/day</p>
      </div>
    </div>
  );
}