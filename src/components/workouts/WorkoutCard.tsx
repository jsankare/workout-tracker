import { Exercise } from '../../types/exercise';
import { Workout } from '../../types/workout';
import { Edit, Trash2, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { useState } from 'react';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
  onDuplicate: (workout: Workout) => void;
}

export default function WorkoutCard({ workout, onEdit, onDelete, onDuplicate }: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatValue = (value: number | undefined, unit: string) => {
    if (value === undefined) return '';
    return `${value}${unit}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:ring-2 hover:ring-yellow-500 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{workout.name}</h3>
          <p className="text-gray-400">{formatDate(workout.date)}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onDuplicate(workout)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors text-yellow-500"
            title="Duplicate workout"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={() => onEdit(workout)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(workout.id)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {workout.notes && (
        <p className="mt-2 text-gray-400">{workout.notes}</p>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
      >
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        <span className="ml-1">{isExpanded ? 'Hide' : 'Show'} Details</span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {workout.exercises.map((exercise, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium mb-2">{exercise.name}</h4>
              <div className="space-y-2">
                {exercise.sets.map((set, setIndex) => (
                  <div key={set.id} className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">Set {setIndex + 1}</span>
                    {set.weight !== undefined && (
                      <span>{formatValue(set.weight, 'kg')}</span>
                    )}
                    {set.reps !== undefined && (
                      <span>{formatValue(set.reps, ' reps')}</span>
                    )}
                    {set.duration !== undefined && (
                      <span>{formatValue(set.duration, 's')}</span>
                    )}
                    {set.distance !== undefined && (
                      <span>{formatValue(set.distance, 'm')}</span>
                    )}
                    {set.notes && (
                      <span className="text-gray-400">{set.notes}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}