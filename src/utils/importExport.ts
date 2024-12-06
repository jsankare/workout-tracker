import { Exercise } from '../types/exercise';
import { Workout } from '../types/workout';
import { PersonalStats } from '../types/stats';
import { addExercise, addWorkout, addPersonalStats } from './db';

interface ExportData {
  version: string;
  timestamp: string;
  exercises: Exercise[];
  workouts: Workout[];
  personalStats: PersonalStats[];
}

export async function exportData(
  exercises: Exercise[],
  workouts: Workout[],
  personalStats: PersonalStats[]
): Promise<void> {
  const exportData: ExportData = {
    version: '1.0',
    timestamp: new Date().toISOString(),
    exercises,
    workouts,
    personalStats,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mali-warrior-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function importData(file: File): Promise<{
  exercises: number;
  workouts: number;
  personalStats: number;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const data: ExportData = JSON.parse(e.target?.result as string);
        
        // Validate data structure
        if (!data.version || !data.exercises || !data.workouts || !data.personalStats) {
          throw new Error('Invalid file format');
        }

        // Import all data
        for (const exercise of data.exercises) {
          await addExercise(exercise);
        }

        for (const workout of data.workouts) {
          await addWorkout(workout);
        }

        for (const stats of data.personalStats) {
          await addPersonalStats(stats);
        }

        resolve({
          exercises: data.exercises.length,
          workouts: data.workouts.length,
          personalStats: data.personalStats.length,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}