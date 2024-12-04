'use client';

import { useState, useEffect } from 'react';
import { useExerciseStore } from '@/lib/hooks/use-exercise-store';
import { useWorkoutStore } from '@/lib/hooks/use-workout-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function ExerciseSelector() {
  const [selectedExercise, setSelectedExercise] = useState('');
  const { exercises, fetchExercises } = useExerciseStore();
  const { addExerciseToWorkout } = useWorkoutStore();

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const handleAddExercise = () => {
    if (selectedExercise) {
      addExerciseToWorkout(selectedExercise);
      setSelectedExercise('');
    }
  };

  return (
    <div className="flex space-x-2">
      <Select value={selectedExercise} onValueChange={setSelectedExercise}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select an exercise" />
        </SelectTrigger>
        <SelectContent>
          {exercises.map((exercise) => (
            <SelectItem key={exercise.id} value={exercise.id}>
              {exercise.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAddExercise} disabled={!selectedExercise}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}