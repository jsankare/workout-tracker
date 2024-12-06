import { useState, useEffect } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Exercise } from '../../types/exercise';
import { Workout, WorkoutExercise } from '../../types/workout';
import { getAllExercises } from '../../utils/db';

interface WorkoutFormProps {
  onSubmit: (workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Workout;
}

export default function WorkoutForm({ onSubmit, onCancel, initialData }: WorkoutFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [date, setDate] = useState(initialData?.date ?? new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState(initialData?.notes ?? '');
  const [exercises, setExercises] = useState<WorkoutExercise[]>(initialData?.exercises ?? []);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');

  useEffect(() => {
    loadExercises();
  }, []);

  async function loadExercises() {
    try {
      const data = await getAllExercises();
      setAvailableExercises(data);
      if (data.length > 0 && !selectedExerciseId) {
        setSelectedExerciseId(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load exercises:', error);
    }
  }

  const handleAddExercise = () => {
    const exercise = availableExercises.find(e => e.id === selectedExerciseId);
    if (!exercise) return;

    const workoutExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      name: exercise.name,
      category: exercise.category,
      sets: [{
        id: crypto.randomUUID(),
        weight: exercise.category === 'Strength' ? 0 : undefined,
        reps: ['Strength', 'Power'].includes(exercise.category) ? 0 : undefined,
        duration: ['Cardio', 'Endurance'].includes(exercise.category) ? 0 : undefined,
        distance: exercise.category === 'Cardio' ? 0 : undefined,
      }],
    };

    setExercises([...exercises, workoutExercise]);
  };

  const handleAddSet = (exerciseIndex: number) => {
    const exercise = exercises[exerciseIndex];
    const newSets = [...exercise.sets, {
      id: crypto.randomUUID(),
      weight: exercise.sets[0].weight !== undefined ? 0 : undefined,
      reps: exercise.sets[0].reps !== undefined ? 0 : undefined,
      duration: exercise.sets[0].duration !== undefined ? 0 : undefined,
      distance: exercise.sets[0].distance !== undefined ? 0 : undefined,
    }];

    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex] = { ...exercise, sets: newSets };
    setExercises(updatedExercises);
  };

  const handleUpdateSet = (exerciseIndex: number, setIndex: number, field: string, value: number | string) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex] = {
      ...updatedExercises[exerciseIndex].sets[setIndex],
      [field]: field === 'notes' ? value : Number(value),
    };
    setExercises(updatedExercises);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    setExercises(updatedExercises);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      date,
      notes,
      exercises,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Workout Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500 h-24"
        />
      </div>

      <div className="border-t border-gray-700 pt-6">
        <div className="flex items-end gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Add Exercise</label>
            <select
              value={selectedExerciseId}
              onChange={(e) => setSelectedExerciseId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:ring-2 focus:ring-yellow-500"
            >
              {availableExercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name} ({exercise.category})
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddExercise}
            className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add
          </button>
        </div>

        {exercises.map((exercise, exerciseIndex) => (
          <div key={exerciseIndex} className="mb-6 bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{exercise.name}</h3>
              <button
                type="button"
                onClick={() => handleRemoveExercise(exerciseIndex)}
                className="text-red-500 hover:text-red-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {exercise.sets.map((set, setIndex) => (
                <div key={set.id} className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">Set {setIndex + 1}</span>
                  
                  {set.weight !== undefined && (
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'weight', e.target.value)}
                      placeholder="Weight (kg)"
                      className="px-3 py-1 bg-gray-600 rounded-md w-24"
                    />
                  )}

                  {set.reps !== undefined && (
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'reps', e.target.value)}
                      placeholder="Reps"
                      className="px-3 py-1 bg-gray-600 rounded-md w-24"
                    />
                  )}

                  {set.duration !== undefined && (
                    <input
                      type="number"
                      value={set.duration}
                      onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'duration', e.target.value)}
                      placeholder="Duration (s)"
                      className="px-3 py-1 bg-gray-600 rounded-md w-24"
                    />
                  )}

                  {set.distance !== undefined && (
                    <input
                      type="number"
                      value={set.distance}
                      onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'distance', e.target.value)}
                      placeholder="Distance (m)"
                      className="px-3 py-1 bg-gray-600 rounded-md w-24"
                    />
                  )}

                  <input
                    type="text"
                    value={set.notes || ''}
                    onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'notes', e.target.value)}
                    placeholder="Notes"
                    className="px-3 py-1 bg-gray-600 rounded-md flex-1"
                  />

                  {exercise.sets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAddSet(exerciseIndex)}
              className="mt-4 px-3 py-1 bg-gray-600 rounded-md text-sm hover:bg-gray-500 transition-colors flex items-center"
            >
              <Plus size={14} className="mr-1" />
              Add Set
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors flex items-center"
        >
          <X size={18} className="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          {initialData ? 'Update' : 'Log'} Workout
        </button>
      </div>
    </form>
  );
}