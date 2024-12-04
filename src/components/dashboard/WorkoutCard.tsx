import React from 'react';
import { MoreVertical, Calendar, Clock } from 'lucide-react';
import { Workout } from '../../types/workout';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onEdit, onDelete }) => {
  return (
    <div className="bg-surface p-4 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{workout.name}</h3>
        <div className="relative group">
          <button className="p-1 hover:bg-surface-light rounded">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg z-10">
            <button
              onClick={() => onEdit(workout)}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-surface-light"
            >
              Edit Workout
            </button>
            <button
              onClick={() => onDelete(workout.id)}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-surface-light"
            >
              Delete Workout
            </button>
          </div>
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
        <ul className="space-y-2">
          {workout.exercises.map((exercise, index) => (
            <li key={index} className="text-gray-400 text-sm">
              {exercise.name} - {exercise.sets} sets × {exercise.reps} reps
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};