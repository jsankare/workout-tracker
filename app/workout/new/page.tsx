'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkoutStore } from '@/lib/hooks/use-workout-store';
import { useExerciseStore } from '@/lib/hooks/use-exercise-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Timer } from '@/components/workout/timer';
import { ExerciseSelector } from '@/components/workout/exercise-selector';
import { WorkoutExerciseList } from '@/components/workout/workout-exercise-list';
import { useToast } from '@/components/ui/use-toast';

export default function NewWorkoutPage() {
  const [workoutName, setWorkoutName] = useState('');
  const { startWorkout, currentWorkout, finishWorkout } = useWorkoutStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleStartWorkout = () => {
    if (!workoutName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a workout name',
        variant: 'destructive',
      });
      return;
    }
    startWorkout(workoutName);
  };

  const handleFinishWorkout = async () => {
    await finishWorkout();
    router.push('/workouts');
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">New Workout</h1>
        <Timer />
      </div>

      {!currentWorkout ? (
        <div className="space-y-4">
          <Input
            placeholder="Enter workout name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
          <Button onClick={handleStartWorkout} className="w-full">
            Start Workout
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <ExerciseSelector />
          <WorkoutExerciseList />
          <Button onClick={handleFinishWorkout} className="w-full">
            Finish Workout
          </Button>
        </div>
      )}
    </div>
  );
}