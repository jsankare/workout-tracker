import React from 'react';
import { clsx } from 'clsx';

interface WorkoutTabsProps {
  activeTab: 'workouts' | 'templates';
  onTabChange: (tab: 'workouts' | 'templates') => void;
}

export const WorkoutTabs: React.FC<WorkoutTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 bg-surface rounded-lg p-1 mb-6">
      <button
        onClick={() => onTabChange('workouts')}
        className={clsx(
          'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors',
          activeTab === 'workouts'
            ? 'bg-background text-white'
            : 'text-gray-400 hover:text-white'
        )}
      >
        My Workouts
      </button>
      <button
        onClick={() => onTabChange('templates')}
        className={clsx(
          'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors',
          activeTab === 'templates'
            ? 'bg-background text-white'
            : 'text-gray-400 hover:text-white'
        )}
      >
        Templates
      </button>
    </div>
  );
};