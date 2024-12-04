'use client';

import { useWorkoutStore } from '@/lib/hooks/use-workout-store';
import { useExerciseStore } from '@/lib/hooks/use-exercise-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function WorkoutExerciseList() {
  const { currentWorkout, updateSet } = useWorkoutStore();
  const { exercises } = useExerciseStore();

  if (!currentWorkout) return null;

  const getExerciseName = (id: string) => {
    const exercise = exercises.find((e) => e.id === id);
    return exercise?.name || 'Unknown Exercise';
  };

  const handleAddSet = (exerciseIndex: number) => {
    updateSet(exerciseIndex, currentWorkout.exercises[exerciseIndex].sets?.length || 0, {
      reps: 0,
      weight: 0,
    });
  };

  const handleUpdateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: 'reps' | 'weight',
    value: string
  ) => {
    const currentSet = currentWorkout.exercises[exerciseIndex].sets?.[setIndex] || {};
    updateSet(exerciseIndex, setIndex, {
      ...currentSet,
      [field]: parseInt(value) || 0,
    });
  };

  return (
    <div className="space-y-4">
      {currentWorkout.exercises.map((exercise, exerciseIndex) => (
        <Card key={`${exercise.exerciseId}-${exerciseIndex}`}>
          <CardHeader>
            <CardTitle>{getExerciseName(exercise.exerciseId)}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exercise.sets?.map((set, setIndex) => (
                <div key={setIndex} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Reps</Label>
                    <Input
                      type="number"
                      value={set.reps || 0}
                      onChange={(e) =>
                        handleUpdateSet(exerciseIndex, setIndex, 'reps', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      value={set.weight || 0}
                      onChange={(e) =>
                        handleUpdateSet(exerciseIndex, setIndex, 'weight', e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleAddSet(exerciseIndex)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Set
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}