import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { PersonalStats } from '../types/stats';
import { getAllPersonalStats, addPersonalStats, getAllWorkouts, getAllExercises } from '../utils/db';
import { calculateWorkoutStats } from '../utils/statsCalculator';
import PersonalStatsForm from '../components/stats/PersonalStatsForm';
import StatsOverview from '../components/stats/StatsOverview';
import WorkoutStatsOverview from '../components/stats/WorkoutStatsOverview';

export default function Stats() {
  const [personalStats, setPersonalStats] = useState<PersonalStats[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [workoutStats, setWorkoutStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const [stats, workouts, exercises] = await Promise.all([
        getAllPersonalStats(),
        getAllWorkouts(),
        getAllExercises(),
      ]);
      
      setPersonalStats(stats.sort((a, b) => b.createdAt - a.createdAt));
      setWorkoutStats(calculateWorkoutStats(workouts, exercises));
      setLoading(false);
    } catch (error) {
      console.error('Failed to load stats:', error);
      setLoading(false);
    }
  }

  const handleSubmit = async (statsData: Omit<PersonalStats, 'id' | 'createdAt'>) => {
    try {
      const newStats: PersonalStats = {
        ...statsData,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      await addPersonalStats(newStats);
      await loadStats();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading stats...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Update Stats
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <PersonalStatsForm
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {personalStats.length > 0 && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Personal Stats</h2>
            <StatsOverview latestStats={personalStats[0]} />
          </div>

          {workoutStats && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Workout Stats</h2>
              <WorkoutStatsOverview stats={workoutStats} />
            </div>
          )}
        </>
      )}

      {personalStats.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No personal stats recorded yet. Click "Update Stats" to get started.
        </div>
      )}
    </div>
  );
}