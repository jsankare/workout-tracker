import { openDB } from 'idb';
import { templateExercises } from '../constants/templates';

const DB_NAME = 'workout-tracker';
const DB_VERSION = 3;

export async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains('exercises')) {
        const exerciseStore = db.createObjectStore('exercises', { keyPath: 'id', autoIncrement: true });
        exerciseStore.createIndex('category', 'category');
        
        // Add template exercises
        const store = transaction.objectStore('exercises');
        templateExercises.forEach(exercise => store.add(exercise));
      }
      
      if (!db.objectStoreNames.contains('workouts')) {
        const workoutStore = db.createObjectStore('workouts', { keyPath: 'id', autoIncrement: true });
        workoutStore.createIndex('date', 'date');
      }
      
      if (!db.objectStoreNames.contains('categories')) {
        const categoryStore = db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true });
        // Add default categories
        const store = transaction.objectStore('categories');
        ['Chest', 'Back', 'Legs', 'Core', 'Shoulders', 'Arms'].forEach(name => 
          store.add({ name })
        );
      }

      // Update existing workouts to include date if upgrading from v2
      if (oldVersion < 3 && db.objectStoreNames.contains('workouts')) {
        const workoutStore = transaction.objectStore('workouts');
        workoutStore.openCursor().then(function addDate(cursor) {
          if (!cursor) return;
          const workout = cursor.value;
          if (!workout.date) {
            workout.date = new Date().toISOString();
            cursor.update(workout);
          }
          return cursor.continue().then(addDate);
        });
      }
    },
  });
  return db;
}

export async function addExercise(exercise) {
  const db = await initDB();
  return db.add('exercises', exercise);
}

export async function getAllExercises() {
  const db = await initDB();
  return db.getAll('exercises');
}

export async function addWorkout(workout) {
  const db = await initDB();
  return db.add('workouts', { ...workout, date: new Date().toISOString() });
}

export async function getAllWorkouts() {
  const db = await initDB();
  const workouts = await db.getAllFromIndex('workouts', 'date');
  return workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getAllCategories() {
  const db = await initDB();
  return db.getAll('categories');
}

export async function addCategory(category) {
  const db = await initDB();
  return db.add('categories', { name: category });
}

export async function exportData() {
  const db = await initDB();
  const [exercises, workouts, categories] = await Promise.all([
    db.getAll('exercises'),
    db.getAll('workouts'),
    db.getAll('categories')
  ]);
  
  return {
    exercises,
    workouts,
    categories,
    exportDate: new Date().toISOString()
  };
}

export async function importData(data) {
  const db = await initDB();
  const tx = db.transaction(['exercises', 'workouts', 'categories'], 'readwrite');
  
  // Clear existing data
  await Promise.all([
    tx.objectStore('exercises').clear(),
    tx.objectStore('workouts').clear(),
    tx.objectStore('categories').clear()
  ]);
  
  // Import new data
  await Promise.all([
    ...data.exercises.map(exercise => tx.objectStore('exercises').add(exercise)),
    ...data.workouts.map(workout => tx.objectStore('workouts').add(workout)),
    ...data.categories.map(category => tx.objectStore('categories').add(category))
  ]);
  
  await tx.done;
}