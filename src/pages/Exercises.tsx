import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ExerciseForm } from '../components/exercises/ExerciseForm';
import { Exercise, ExerciseType, MuscleGroup, Muscle } from '../types/exercise';
import { db } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

export const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ExerciseType | 'all'>('all');

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    const database = await db;
    const allExercises = await database.getAll('exercises') || [];
    // Ensure the exercises from DB match the Exercise type
    const typedExercises: Exercise[] = allExercises.map(exercise => ({
      ...exercise,
      type: exercise.type as ExerciseType,
      muscleGroups: exercise.muscleGroups.map(group => group as MuscleGroup),
      muscles: exercise.muscles.map(muscle => muscle as Muscle),
    }));
    setExercises(typedExercises);
  };

  const handleCreateExercise = async (exerciseData: Omit<Exercise, 'id'>) => {
    const database = await db;
    const exercise: Exercise = {
      ...exerciseData,
      id: uuidv4(),
    };
    await database.add('exercises', exercise);
    setExercises([...exercises, exercise]);
    setShowForm(false);
  };

  const handleEditExercise = async (exerciseData: Omit<Exercise, 'id'>) => {
    if (!editingExercise) return;
    const database = await db;
    const updatedExercise: Exercise = {
      ...exerciseData,
      id: editingExercise.id,
    };
    await database.put('exercises', updatedExercise);
    setExercises(exercises.map(e => e.id === editingExercise.id ? updatedExercise : e));
    setEditingExercise(null);
  };

  const handleDeleteExercise = async (id: string) => {
    const database = await db;
    await database.delete('exercises', id);
    setExercises(exercises.filter(e => e.id !== id));
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || exercise.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Exercise Library</h1>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-5 h-5 mr-2" />
              New Exercise
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ExerciseType | 'all')}
              className="px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-white"
            >
              <option value="all">All Types</option>
              {Object.values(ExerciseType).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {(showForm || editingExercise) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-background p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingExercise ? 'Edit Exercise' : 'Create New Exercise'}
                </h2>
                <ExerciseForm
                  onSubmit={editingExercise ? handleEditExercise : handleCreateExercise}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingExercise(null);
                  }}
                  initialExercise={editingExercise || undefined}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="bg-surface p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{exercise.name}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingExercise(exercise)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteExercise(exercise.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
                  {exercise.type}
                </span>
                {exercise.description && (
                  <p className="text-gray-400 mb-4">{exercise.description}</p>
                )}
                {exercise.muscleGroups.length > 0 && (
                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-gray-300 mb-1">Muscle Groups:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exercise.muscleGroups.map((group) => (
                        <span key={group} className="text-sm text-gray-400">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No exercises found. Create your first exercise to get started!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};