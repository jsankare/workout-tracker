import React from 'react';
import { Calendar, Clock, Scale, Hash, Pencil, Trash2, Copy, Play } from 'lucide-react';
import { Workout } from '../../types/workout';
import { Button } from '../ui/Button';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
  onDuplicate: (workout: Workout) => void;
  onUseTemplate?: (workout: Workout) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  workout, 
  onEdit, 
  onDelete, 
  onDuplicate,
  onUseTemplate 
}) => {
  const isTemplate = workout.userId === 'template';

  return (
    <div className="bg-surface p-4 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{workout.name}</h3>
        <div className="flex gap-2">
          {onUseTemplate && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onUseTemplate(workout)}
              title="Use template"
            >
              <Play className="w-4 h-4 mr-2" />
              Use
            </Button>
          )}
          <button
            onClick={() => onDuplicate(workout)}
            className="p-1.5 hover:bg-surface-light rounded-full text-gray-400 hover:text-primary transition-colors"
            title={`Duplicate ${isTemplate ? 'template' : 'workout'}`}
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(workout)}
            className="p-1.5 hover:bg-surface-light rounded-full text-gray-400 hover:text-primary transition-colors"
            title={`Edit ${isTemplate ? 'template' : 'workout'}`}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(workout.id)}
            className="p-1.5 hover:bg-surface-light rounded-full text-gray-400 hover:text-red-400 transition-colors"
            title={`Delete ${isTemplate ? 'template' : 'workout'}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{new Date(workout.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">{workout.duration} minutes</span>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Exercises:</h4>
        <ul className="space-y-3">
          {workout.exercises.map((exercise, index) => (
            <li key={index} className="text-gray-400 text-sm">
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-white">{exercise.name}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Hash className="w-4 h-4 mr-1" />
                    {exercise.sets} sets
                  </div>
                  {exercise.reps && (
                    <div className="flex items-center">
                      <Hash className="w-4 h-4 mr-1" />
                      {exercise.reps} reps
                    </div>
                  )}
                  {exercise.weight && (
                    <div className="flex items-center">
                      <Scale className="w-4 h-4 mr-1" />
                      {exercise.weight} kg
                    </div>
                  )}
                </div>
                {exercise.notes && (
                  <span className="text-xs text-gray-500">{exercise.notes}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};