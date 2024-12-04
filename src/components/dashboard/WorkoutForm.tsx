import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Exercise, Workout } from '../../types/workout';

interface WorkoutFormProps {
  onSubmit: (workout: Omit<Workout, 'id'>) => void;
  onCancel: () => void;
  initialWorkout?: Workout;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  onSubmit,
  onCancel,
  initialWorkout,
}) => {
  const [workout, setWorkout] = useState<Omit<Workout, 'id'>>({
    name: initialWorkout?.name || '',
    date: initialWorkout?.date || new Date().toISOString().split('T')[0],
    duration: initialWorkout?.duration || 0,
    exercises: initialWorkout?.exercises || [],
  });

  const addExercise = () => {
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', sets: 0, reps: 0 }],
    }));
  };

  const removeExercise = (index: number) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index ? { ...exercise, [field]: value } : exercise
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(workout);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Workout Name"
        value={workout.name}
        onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
        required
      />

      <Input
        type="date"
        label="Date"
        value={workout.date}
        onChange={(e) => setWorkout({ ...workout, date: e.target.value })}
        required
      />

      <Input
        type="number"
        label="Duration (minutes)"
        value={workout.duration}
        onChange={(e) => setWorkout({ ...workout, duration: Number(e.target.value) })}
        required
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-white">Exercises</h3>
          <Button type="button" onClick={addExercise}>
            <Plus className="w-4 h-4 mr-2" />
            Add Exercise
          </Button>
        </div>

        {workout.exercises.map((exercise, index) => (
          <div key={index} className="flex gap-4 items-start">
            <Input
              value={exercise.name}
              onChange={(e) => updateExercise(index, 'name', e.target.value)}
              placeholder="Exercise name"
              required
            />
            <Input
              type="number"
              value={exercise.sets}
              onChange={(e) => updateExercise(index, 'sets', Number(e.target.value))}
              placeholder="Sets"
              required
            />
            <Input
              type="number"
              value={exercise.reps}
              onChange={(e) => updateExercise(index, 'reps', Number(e.target.value))}
              placeholder="Reps"
              required
            />
            <button
              type="button"
              onClick={() => removeExercise(index)}
              className="p-2 text-gray-400 hover:text-red-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialWorkout ? 'Update Workout' : 'Create Workout'}
        </Button>
      </div>
    </form>
  );
};