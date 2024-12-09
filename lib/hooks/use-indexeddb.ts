"use client";

import { useState, useEffect } from 'react';
import { getDB } from '@/lib/db';

export function useIndexedDB<T>(
  storeName: 'exercises' | 'workoutTemplates' | 'completedWorkouts',
  key?: string
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await getDB();
        if (key) {
          const result = await db.get(storeName, key);
          setData(result);
        } else {
          const result = await db.getAll(storeName);
          setData(result as T);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeName, key]);

  const addItem = async (item: T) => {
    try {
      const db = await getDB();
      await db.add(storeName, item);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return false;
    }
  };

  const updateItem = async (item: T) => {
    try {
      const db = await getDB();
      await db.put(storeName, item);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return false;
    }
  };

  const deleteItem = async (key: string) => {
    try {
      const db = await getDB();
      await db.delete(storeName, key);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return false;
    }
  };

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
  };
}