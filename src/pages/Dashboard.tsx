import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { WorkoutCard } from '../components/dashboard/WorkoutCard';
import { WorkoutForm } from '../components/dashboard/WorkoutForm';
import { Workout } from '../types/workout';
import { db } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    loadWorkouts();
  }, [user]);

  const loadWorkouts = async () => {
    if (!user) return;
    const database = await db;
    const userWorkouts = await database.getAll('workouts') || [];
    setWorkouts(userWorkouts.filter(workout => workout.userId === user.id));
  };

  const handleCreateWorkout = async (workoutData: Omit<Workout, 'id' | 'userId'>) => {
    if (!user) return;
    const database = await db;
    const workout = {
      ...workoutData,
      id: uuidv4(),
      userId: user.id,
    };
    await database.add('workouts', workout);
    setWorkouts([...workouts, workout]);
    setShowForm(false);
  };

  const handleEditWorkout = async (workoutData: Omit<Workout, 'id' | 'userId'>) => {
    if (!editingWorkout || !user) return;
    const database = await db;
    const updatedWorkout = {
      ...workoutData,
      id: editingWorkout.id,
      userId: user.id,
    };
    await database.put('workouts', updatedWorkout);
    setWorkouts(workouts.map(w => w.id === editingWorkout.id ? updatedWorkout : w));
    setEditingWorkout(null);
  };

  const handleDuplicateWorkout = async (workout: Workout) => {
    if (!user) return;
    const database = await db;
    const duplicatedWorkout = {
      ...workout,
      id: uuidv4(),
      userId: user.id,
      name: `${workout.name} (Copy)`,
      date: new Date().toISOString().split('T')[0],
    };
    await database.add('workouts', duplicatedWorkout);
    setWorkouts([...workouts, duplicatedWorkout]);
  };

  const handleDeleteWorkout = async (id: string) => {
    const database = await db;
    await database.delete('workouts', id);
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Workouts</h1>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-5 h-5 mr-2" />
              New Workout
            </Button>
          </div>

          {(showForm || editingWorkout) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
              <div className="bg-background p-6 rounded-lg w-full max-w-2xl my-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editingWorkout ? 'Edit Workout' : 'Create New Workout'}
                </h2>
                <WorkoutForm
                  onSubmit={editingWorkout ? handleEditWorkout : handleCreateWorkout}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingWorkout(null);
                  }}
                  initialWorkout={editingWorkout || undefined}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workout => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onEdit={setEditingWorkout}
                onDelete={handleDeleteWorkout}
                onDuplicate={handleDuplicateWorkout}
              />
            ))}
          </div>

          {workouts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No workouts yet. Create your first workout to get started!</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};