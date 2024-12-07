import { Exercise } from '../types/exercise';
import { Workout } from '../types/workout';
import { PersonalStats } from '../types/stats';

const DB_NAME = 'MaliWarriorDB';
const DB_VERSION = 3; // Increased version for new store
const EXERCISE_STORE = 'exercises';
const WORKOUT_STORE = 'workouts';
const STATS_STORE = 'personalStats';

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Exercise store
      if (!db.objectStoreNames.contains(EXERCISE_STORE)) {
        const store = db.createObjectStore(EXERCISE_STORE, { keyPath: 'id' });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('muscleGroups', 'muscleGroups', { unique: false, multiEntry: true });
      }

      // Workout store
      if (!db.objectStoreNames.contains(WORKOUT_STORE)) {
        const store = db.createObjectStore(WORKOUT_STORE, { keyPath: 'id' });
        store.createIndex('date', 'date', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // Personal stats store
      if (!db.objectStoreNames.contains(STATS_STORE)) {
        const store = db.createObjectStore(STATS_STORE, { keyPath: 'id' });
        store.createIndex('date', 'date', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  });
}

// Exercise operations
export async function getAllExercises(): Promise<Exercise[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXERCISE_STORE, 'readonly');
    const store = transaction.objectStore(EXERCISE_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function addExercise(exercise: Exercise): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXERCISE_STORE, 'readwrite');
    const store = transaction.objectStore(EXERCISE_STORE);
    const request = store.add(exercise);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function updateExercise(exercise: Exercise): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXERCISE_STORE, 'readwrite');
    const store = transaction.objectStore(EXERCISE_STORE);
    const request = store.put(exercise);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function deleteExercise(id: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXERCISE_STORE, 'readwrite');
    const store = transaction.objectStore(EXERCISE_STORE);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Workout operations
export async function getAllWorkouts(): Promise<Workout[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(WORKOUT_STORE, 'readonly');
    const store = transaction.objectStore(WORKOUT_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function getWorkout(id: string): Promise<Workout> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(WORKOUT_STORE, 'readonly');
    const store = transaction.objectStore(WORKOUT_STORE);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function addWorkout(workout: Workout): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(WORKOUT_STORE, 'readwrite');
    const store = transaction.objectStore(WORKOUT_STORE);
    const request = store.add(workout);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function updateWorkout(workout: Workout): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(WORKOUT_STORE, 'readwrite');
    const store = transaction.objectStore(WORKOUT_STORE);
    const request = store.put(workout);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function deleteWorkout(id: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(WORKOUT_STORE, 'readwrite');
    const store = transaction.objectStore(WORKOUT_STORE);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Personal Stats operations
export async function getAllPersonalStats(): Promise<PersonalStats[]> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STATS_STORE, 'readonly');
    const store = transaction.objectStore(STATS_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function addPersonalStats(stats: PersonalStats): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STATS_STORE, 'readwrite');
    const store = transaction.objectStore(STATS_STORE);
    const request = store.add(stats);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function updatePersonalStats(stats: PersonalStats): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STATS_STORE, 'readwrite');
    const store = transaction.objectStore(STATS_STORE);
    const request = store.put(stats);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function deletePersonalStats(id: string): Promise<void> {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STATS_STORE, 'readwrite');
    const store = transaction.objectStore(STATS_STORE);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}