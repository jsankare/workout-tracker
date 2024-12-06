import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Exercise } from '../types/exercise';
import { getAllExercises, addExercise, updateExercise, deleteExercise } from '../utils/db';
import ExerciseCard from '../components/exercises/ExerciseCard';
import ExerciseForm from '../components/exercises/ExerciseForm';

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadExercises();
  }, []);

  async function loadExercises() {
    try {
      const data = await getAllExercises();
      setExercises(data);
    } catch (error) {
      console.error('Failed to load exercises:', error);
    }
  }

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscleGroups.some(group => group.toLowerCase().includes(searchTerm.toLowerCase())) ||
    exercise.muscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase())) ||
    exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (exerciseData: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingExercise) {
        const updatedExercise = {
          ...editingExercise,
          ...exerciseData,
          updatedAt: Date.now(),
        };
        await updateExercise(updatedExercise);
      } else {
        const newExercise: Exercise = {
          ...exerciseData,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        await addExercise(newExercise);
      }
      await loadExercises();
      setShowForm(false);
      setEditingExercise(null);
    } catch (error) {
      console.error('Failed to save exercise:', error);
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await deleteExercise(id);
        await loadExercises();
      } catch (error) {
        console.error('Failed to delete exercise:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Exercises</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Exercise
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {showForm && (
        <div className="mb-8">
          <ExerciseForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingExercise(null);
            }}
            initialData={editingExercise ?? undefined}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          {searchTerm ? 'No exercises found matching your search.' : 'No exercises added yet.'}
        </div>
      )}
    </div>
  );
}