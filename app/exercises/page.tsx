'use client';

import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useExerciseStore } from '@/lib/hooks/use-exercise-store';
import { Button } from '@/components/ui/button';
import { ExerciseList } from '@/components/exercises/exercise-list';
import { ExerciseDialog } from '@/components/exercises/exercise-dialog';
import { useToast } from '@/components/ui/use-toast';

export default function ExercisesPage() {
  const { exercises, fetchExercises, loading } = useExerciseStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchExercises().catch((error) => {
      toast({
        title: 'Error',
        description: 'Failed to load exercises',
        variant: 'destructive',
      });
    });
  }, [fetchExercises, toast]);

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Exercise Library</h1>
        <ExerciseDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Exercise
          </Button>
        </ExerciseDialog>
      </div>
      <ExerciseList exercises={exercises} isLoading={loading} />
    </div>
  );
}