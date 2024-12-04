import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { WorkoutCard } from '../components/dashboard/WorkoutCard';
import { WorkoutForm } from '../components/dashboard/WorkoutForm';
import { WorkoutTabs } from '../components/dashboard/WorkoutTabs';
import { Workout } from '../types/workout';
import { db } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [templateWorkouts, setTemplateWorkouts] = useState<Workout[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [activeTab, setActiveTab] = useState<'workouts' | 'templates'>('workouts');
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  useEffect(() => {
    loadWorkouts();
    loadTemplates();
  }, [user]);

  useEffect(() => {
    if (showForm || editingWorkout) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm, editingWorkout]);

  const loadWorkouts = async () => {
    if (!user) return;
    const database = await db;
    const userWorkouts = await database.getAll('workouts') || [];
    setWorkouts(userWorkouts.filter(workout => workout.userId === user.id));
  };

  const loadTemplates = async () => {
    const database = await db;
    const allWorkouts = await database.getAll('workouts') || [];
    setTemplateWorkouts(allWorkouts.filter(workout => workout.userId === 'template'));
  };

  const handleCreateWorkout = async (workoutData: Omit<Workout, 'id' | 'userId'>) => {
    if (!user) return;
    const database = await db;
    const workout = {
      ...workoutData,
      id: uuidv4(),
      userId: isCreatingTemplate ? 'template' : user.id,
    };
    await database.add('workouts', workout);
    
    if (isCreatingTemplate) {
      setTemplateWorkouts([...templateWorkouts, workout]);
    } else {
      setWorkouts([...workouts, workout]);
    }
    
    setShowForm(false);
    setIsCreatingTemplate(false);
  };

  const handleEditWorkout = async (workoutData: Omit<Workout, 'id' | 'userId'>) => {
    if (!editingWorkout) return;
    const database = await db;
    const updatedWorkout = {
      ...workoutData,
      id: editingWorkout.id,
      userId: editingWorkout.userId,
    };
    await database.put('workouts', updatedWorkout);
    
    if (editingWorkout.userId === 'template') {
      setTemplateWorkouts(templateWorkouts.map(w => w.id === editingWorkout.id ? updatedWorkout : w));
    } else {
      setWorkouts(workouts.map(w => w.id === editingWorkout.id ? updatedWorkout : w));
    }
    
    setEditingWorkout(null);
  };

  const handleUseTemplate = (template: Workout) => {
    setShowForm(true);
    const templateData: Omit<Workout, 'id' | 'userId'> = {
      name: `${template.name} (Copy)`,
      date: new Date().toISOString().split('T')[0],
      duration: template.duration,
      exercises: template.exercises,
    };
    handleCreateWorkout(templateData);
  };

  const handleDuplicateWorkout = async (workout: Workout) => {
    if (!user) return;
    const database = await db;
    const duplicatedWorkout = {
      ...workout,
      id: uuidv4(),
      userId: workout.userId,
      name: `${workout.name} (Copy)`,
      date: new Date().toISOString().split('T')[0],
    };
    await database.add('workouts', duplicatedWorkout);
    
    if (workout.userId === 'template') {
      setTemplateWorkouts([...templateWorkouts, duplicatedWorkout]);
    } else {
      setWorkouts([...workouts, duplicatedWorkout]);
    }
  };

  const handleDeleteWorkout = async (id: string) => {
    const database = await db;
    await database.delete('workouts', id);
    
    const workoutToDelete = [...workouts, ...templateWorkouts].find(w => w.id === id);
    if (workoutToDelete?.userId === 'template') {
      setTemplateWorkouts(templateWorkouts.filter(w => w.id !== id));
    } else {
      setWorkouts(workouts.filter(w => w.id !== id));
    }
  };

  const closeModal = () => {
    setShowForm(false);
    setEditingWorkout(null);
    setIsCreatingTemplate(false);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Workouts</h1>
            <div className="flex gap-4">
              {activeTab === 'templates' && (
                <Button 
                  onClick={() => {
                    setIsCreatingTemplate(true);
                    setShowForm(true);
                  }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Template
                </Button>
              )}
              {activeTab === 'workouts' && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  New Workout
                </Button>
              )}
            </div>
          </div>

          <WorkoutTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {(showForm || editingWorkout) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
              <div className="min-h-screen px-4 text-center">
                <div className="fixed inset-0" onClick={closeModal} />
                <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                <div className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle bg-background rounded-lg shadow-xl relative">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {editingWorkout ? 'Edit Workout' : isCreatingTemplate ? 'Create New Template' : 'Create New Workout'}
                  </h2>
                  <WorkoutForm
                    onSubmit={editingWorkout ? handleEditWorkout : handleCreateWorkout}
                    onCancel={closeModal}
                    initialWorkout={editingWorkout || undefined}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workouts' ? (
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
              {workouts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No workouts yet. Create your first workout or use a template to get started!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateWorkouts.map(template => (
                <WorkoutCard
                  key={template.id}
                  workout={template}
                  onEdit={setEditingWorkout}
                  onDelete={handleDeleteWorkout}
                  onDuplicate={handleDuplicateWorkout}
                  onUseTemplate={handleUseTemplate}
                />
              ))}
              {templateWorkouts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No templates yet. Create your first template workout!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};