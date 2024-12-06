import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { Workout } from '../types/workout';
import { getAllWorkouts, addWorkout, updateWorkout, deleteWorkout } from '../utils/db';
import WorkoutCard from '../components/workouts/WorkoutCard';
import WorkoutForm from '../components/workouts/WorkoutForm';

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function loadWorkouts() {
    try {
      const data = await getAllWorkouts();
      setWorkouts(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error('Failed to load workouts:', error);
    }
  }

  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.exercises.some(exercise => 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSubmit = async (workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingWorkout) {
        const updatedWorkout = {
          ...editingWorkout,
          ...workoutData,
          updatedAt: Date.now(),
        };
        await updateWorkout(updatedWorkout);
      } else {
        const newWorkout: Workout = {
          ...workoutData,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        await addWorkout(newWorkout);
      }
      await loadWorkouts();
      setShowForm(false);
      setEditingWorkout(null);
    } catch (error) {
      console.error('Failed to save workout:', error);
    }
  };

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await deleteWorkout(id);
        await loadWorkouts();
      } catch (error) {
        console.error('Failed to delete workout:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Workouts</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Log Workout
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-gray-800 rounded-lg focus:ring-2 focus:ring-yellow-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {showForm && (
        <div className="mb-8">
          <WorkoutForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingWorkout(null);
            }}
            initialData={editingWorkout ?? undefined}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          {searchTerm ? 'No workouts found matching your search.' : 'No workouts logged yet.'}
        </div>
      )}
    </div>
  );
}