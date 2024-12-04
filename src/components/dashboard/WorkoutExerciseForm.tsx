import React from 'react';
import { Clock, Scale, Hash, GripVertical, X } from 'lucide-react';
import { Input } from '../ui/Input';
import { WorkoutExercise } from '../../types/workout';

interface WorkoutExerciseFormProps {
  exercise: WorkoutExercise;
  onUpdate: (exercise: WorkoutExercise) => void;
  onRemove: () => void;
}

export const WorkoutExerciseForm: React.FC<WorkoutExerciseFormProps> = ({
  exercise,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="flex items-start gap-4 bg-surface p-4 rounded-lg">
      <div className="text-gray-400 mt-2">
        <GripVertical className="w-5 h-5" />
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">{exercise.name}</h3>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Input
              type="number"
              value={exercise.sets}
              onChange={(e) => onUpdate({ ...exercise, sets: Number(e.target.value) })}
              placeholder="Sets"
              min="0"
              className="pl-10"
            />
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="number"
              value={exercise.reps || ''}
              onChange={(e) => onUpdate({ ...exercise, reps: Number(e.target.value) })}
              placeholder="Reps"
              min="0"
              className="pl-10"
            />
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="number"
              value={exercise.weight || ''}
              onChange={(e) => onUpdate({ ...exercise, weight: Number(e.target.value) })}
              placeholder="Weight (kg)"
              min="0"
              className="pl-10"
            />
            <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="number"
              value={exercise.duration || ''}
              onChange={(e) => onUpdate({ ...exercise, duration: Number(e.target.value) })}
              placeholder="Time (sec)"
              min="0"
              className="pl-10"
            />
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <Input
          value={exercise.notes || ''}
          onChange={(e) => onUpdate({ ...exercise, notes: e.target.value })}
          placeholder="Notes (optional)"
        />
      </div>
    </div>
  );
};