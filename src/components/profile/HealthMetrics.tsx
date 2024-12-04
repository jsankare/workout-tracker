import React from 'react';
import { Activity, Heart, Scale, Ruler } from 'lucide-react';
import { HealthMetrics } from '../../types/user';

interface HealthMetricsDisplayProps {
  metrics: HealthMetrics;
}

export const HealthMetricsDisplay: React.FC<HealthMetricsDisplayProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Scale className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-white">BMI</h3>
        </div>
        <p className="text-3xl font-bold text-white mb-2">{metrics.bmi}</p>
        <p className="text-gray-400">Category: {metrics.bmiCategory}</p>
      </div>

      <div className="bg-surface p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Heart className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-white">BMR</h3>
        </div>
        <p className="text-3xl font-bold text-white mb-2">{metrics.bmr}</p>
        <p className="text-gray-400">Calories/day at rest</p>
      </div>

      <div className="bg-surface p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Ruler className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-white">Ideal Weight</h3>
        </div>
        <p className="text-3xl font-bold text-white mb-2">{metrics.idealWeight} kg</p>
        <p className="text-gray-400">Based on your height</p>
      </div>

      <div className="bg-surface p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Activity className="w-6 h-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-white">Daily Activity</h3>
        </div>
        <p className="text-gray-400">
          Light: {Math.round(metrics.bmr * 1.375)} cal<br />
          Moderate: {Math.round(metrics.bmr * 1.55)} cal<br />
          Active: {Math.round(metrics.bmr * 1.725)} cal
        </p>
      </div>
    </div>
  );
};