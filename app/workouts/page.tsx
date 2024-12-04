'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useWorkoutStore } from '@/lib/hooks/use-workout-store';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { WorkoutList } from '@/components/workouts/workout-list';

export default function WorkoutsPage() {
  const { workouts, fetchWorkouts } = useWorkoutStore();

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Workouts</h1>
        <Button asChild>
          <Link href="/workout/new">
            <Plus className="mr-2 h-4 w-4" />
            New Workout
          </Link>
        </Button>
      </div>
      <WorkoutList workouts={workouts} />
    </div>
  );
}