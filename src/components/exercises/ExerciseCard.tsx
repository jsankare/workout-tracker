import { Exercise } from '../../types/exercise';
import { Edit, Trash2 } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

export default function ExerciseCard({ exercise, onEdit, onDelete }: ExerciseCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:ring-2 hover:ring-yellow-500 transition-all">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{exercise.name}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(exercise)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(exercise.id)}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {exercise.description && (
        <p className="mt-2 text-gray-400">{exercise.description}</p>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {exercise.muscleGroups.map((group) => (
            <span
              key={group}
              className="px-2 py-1 bg-gray-700 rounded-full text-xs"
            >
              {group}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {exercise.muscles.map((muscle) => (
            <span
              key={muscle}
              className="px-2 py-1 bg-yellow-500 text-black rounded-full text-xs"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <span className="bg-gray-700 px-2 py-1 rounded">
          {exercise.category}
        </span>
        <span>
          Added: {new Date(exercise.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}