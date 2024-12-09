import { getDB } from '../db';

export async function exportData() {
  const db = await getDB();
  const data = {
    exercises: await db.getAll('exercises'),
    workoutTemplates: await db.getAll('workoutTemplates'),
    completedWorkouts: await db.getAll('completedWorkouts'),
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `workout-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importData(file: File): Promise<{ success: boolean; message: string }> {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    // Validate data structure
    if (!data.exercises || !data.workoutTemplates || !data.completedWorkouts) {
      throw new Error('Invalid data format');
    }
    
    const db = await getDB();
    
    // Clear existing data
    await Promise.all([
      db.clear('exercises'),
      db.clear('workoutTemplates'),
      db.clear('completedWorkouts'),
    ]);
    
    // Import new data
    await Promise.all([
      ...data.exercises.map((exercise: any) => db.add('exercises', exercise)),
      ...data.workoutTemplates.map((template: any) => db.add('workoutTemplates', template)),
      ...data.completedWorkouts.map((workout: any) => db.add('completedWorkouts', workout)),
    ]);
    
    return { success: true, message: 'Data imported successfully' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to import data',
    };
  }
}