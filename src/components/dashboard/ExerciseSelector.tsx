import React from 'react';
import { Search } from 'lucide-react';
import { Exercise, ExerciseType } from '../../types/exercise';
import { Input } from '../ui/Input';

interface ExerciseSelectorProps {
  exercises: Exercise[];
  onSelect: (exercise: Exercise) => void;
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
  exercises,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<ExerciseType | 'all'>('all');

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || exercise.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            icon={<Search className="w-5 h-5" />}
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as ExerciseType | 'all')}
          className="px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white"
        >
          <option value="all">All Types</option>
          {Object.values(ExerciseType).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
        {filteredExercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => onSelect(exercise)}
            className="text-left p-4 bg-surface hover:bg-surface-light rounded-lg transition-colors"
          >
            <h3 className="font-medium text-white">{exercise.name}</h3>
            <span className="text-sm text-gray-400">{exercise.type}</span>
          </button>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <p className="text-center text-gray-400">No exercises found</p>
      )}
    </div>
  );
};