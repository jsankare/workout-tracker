import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Exercise } from '../../types/exercise';
import { Workout, WorkoutExercise } from '../../types/workout';
import { ExerciseSelector } from './ExerciseSelector';
import { WorkoutExerciseForm } from './WorkoutExerciseForm';
import { db } from '../../lib/db';

interface WorkoutFormProps {
  onSubmit: (workout: Omit<Workout, 'id' | 'userId'>) => void;
  onCancel: () => void;
  initialWorkout?: Workout;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  onSubmit,
  onCancel,
  initialWorkout,
}) => {
  const [workout, setWorkout] = useState<Omit<Workout, 'id' | 'userId'>>({
    name: initialWorkout?.name || '',
    date: initialWorkout?.date || new Date().toISOString().split('T')[0],
    duration: initialWorkout?.duration || 0,
    exercises: initialWorkout?.exercises || [],
  });

  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const loadExercises = async () => {
      const database = await db;
      const exercises = await database.getAll('exercises') || [];
      // Ensure the exercises from DB match the Exercise type
      const typedExercises: Exercise[] = exercises.map(exercise => ({
        ...exercise,
        type: exercise.type as Exercise['type'],
        muscleGroups: exercise.muscleGroups as Exercise['muscleGroups'],
        muscles: exercise.muscles as Exercise['muscles']
      }));
      setAvailableExercises(typedExercises);
    };
    loadExercises();
  }, []);

  const handleAddExercise = (exercise: Exercise) => {
    const workoutExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      name: exercise.name,
      sets: 1,
    };
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, workoutExercise],
    }));
    setShowExerciseSelector(false);
  };

  const handleUpdateExercise = (index: number, updatedExercise: WorkoutExercise) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) =>
        i === index ? updatedExercise : exercise
      ),
    }));
  };

  const handleRemoveExercise = (index: number) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
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
          <Button type="button" onClick={() => setShowExerciseSelector(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Exercise
          </Button>
        </div>

        {showExerciseSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-background p-6 rounded-lg w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Select Exercise</h2>
                <button
                  type="button"
                  onClick={() => setShowExerciseSelector(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <ExerciseSelector
                exercises={availableExercises}
                onSelect={handleAddExercise}
              />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {workout.exercises.map((exercise, index) => (
            <WorkoutExerciseForm
              key={index}
              exercise={exercise}
              onUpdate={(updated) => handleUpdateExercise(index, updated)}
              onRemove={() => handleRemoveExercise(index)}
            />
          ))}
        </div>

        {workout.exercises.length === 0 && (
          <p className="text-center text-gray-400 py-4">
            No exercises added yet. Click "Add Exercise" to get started.
          </p>
        )}
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