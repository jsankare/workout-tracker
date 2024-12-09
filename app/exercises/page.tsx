"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIndexedDB } from '@/lib/hooks/use-indexeddb';
import { useTemplateExercises } from '@/lib/hooks/use-template-exercises';
import { Exercise } from '@/lib/types/exercise';
import { ExerciseList } from '@/components/exercises/exercise-list';
import { ExerciseForm } from '@/components/exercises/exercise-form';
import { useToast } from '@/components/ui/use-toast';

export default function ExercisesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { exercises, loading } = useTemplateExercises();
  const { addItem } = useIndexedDB<Exercise[]>('exercises');
  const { toast } = useToast();

  const handleAddExercise = async (exercise: Exercise) => {
    const success = await addItem(exercise);
    if (success) {
      toast({
        title: 'Exercise added',
        description: `${exercise.name} has been added to your exercise library.`,
      });
      setIsFormOpen(false);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to add exercise. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Exercise Library</h1>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Exercise
        </Button>
      </div>

      {exercises && exercises.length > 0 ? (
        <ExerciseList exercises={exercises} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No exercises added yet.</p>
        </div>
      )}

      <ExerciseForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAddExercise}
      />
    </div>
  );
}