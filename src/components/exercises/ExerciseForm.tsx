import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Exercise, ExerciseType, MuscleGroup, Muscle } from '../../types/exercise';

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, 'id'>) => void;
  onCancel: () => void;
  initialExercise?: Exercise;
}

export const ExerciseForm: React.FC<ExerciseFormProps> = ({
  onSubmit,
  onCancel,
  initialExercise,
}) => {
  const [exercise, setExercise] = useState<Omit<Exercise, 'id'>>({
    name: initialExercise?.name || '',
    type: initialExercise?.type || ExerciseType.STRENGTH,
    muscleGroups: initialExercise?.muscleGroups || [],
    muscles: initialExercise?.muscles || [],
    description: initialExercise?.description || '',
    instructions: initialExercise?.instructions || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(exercise);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Exercise Name"
        value={exercise.name}
        onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Exercise Type
        </label>
        <select
          value={exercise.type}
          onChange={(e) => setExercise({ ...exercise, type: e.target.value as ExerciseType })}
          className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white"
          required
        >
          {Object.values(ExerciseType).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Muscle Groups
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(MuscleGroup).map((group) => (
            <label key={group} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exercise.muscleGroups.includes(group)}
                onChange={(e) => {
                  const newGroups = e.target.checked
                    ? [...exercise.muscleGroups, group]
                    : exercise.muscleGroups.filter((g) => g !== group);
                  setExercise({ ...exercise, muscleGroups: newGroups });
                }}
                className="text-primary"
              />
              <span className="text-white">{group.charAt(0).toUpperCase() + group.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Specific Muscles
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(Muscle).map((muscle) => (
            <label key={muscle} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exercise.muscles.includes(muscle)}
                onChange={(e) => {
                  const newMuscles = e.target.checked
                    ? [...exercise.muscles, muscle]
                    : exercise.muscles.filter((m) => m !== muscle);
                  setExercise({ ...exercise, muscles: newMuscles });
                }}
                className="text-primary"
              />
              <span className="text-white">{muscle.charAt(0).toUpperCase() + muscle.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Description
        </label>
        <textarea
          value={exercise.description}
          onChange={(e) => setExercise({ ...exercise, description: e.target.value })}
          className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white min-h-[100px]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">
          Instructions
        </label>
        <textarea
          value={exercise.instructions}
          onChange={(e) => setExercise({ ...exercise, instructions: e.target.value })}
          className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white min-h-[100px]"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialExercise ? 'Update Exercise' : 'Create Exercise'}
        </Button>
      </div>
    </form>
  );
};