"use client";

import { useState, useEffect } from 'react';
import { Exercise } from '@/lib/types/exercise';
import { WorkoutTemplate, CompletedWorkout, CompletedExercise, ExerciseSet } from '@/lib/types/workout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIndexedDB } from '@/lib/hooks/use-indexeddb';
import { useToast } from '@/components/ui/use-toast';
import { Timer } from '@/components/workout/timer';
import { ExerciseSelector } from '@/components/workout/exercise-selector';
import { Plus, Save, X, Trash2 } from 'lucide-react';
import { generateWorkoutId } from '@/lib/utils/workout';

interface WorkoutLoggerProps {
  template: WorkoutTemplate;
  exercises: Exercise[];
  onCancel: () => void;
  onComplete: () => void;
}

export function WorkoutLogger({ template, exercises, onCancel, onComplete }: WorkoutLoggerProps) {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [isExerciseSelectorOpen, setIsExerciseSelectorOpen] = useState(false);
  const [workoutData, setWorkoutData] = useState<CompletedWorkout>({
    id: generateWorkoutId(),
    templateId: template.id || undefined,
    name: template.name,
    date: new Date().toISOString(),
    duration: 0,
    exercises: template.exercises.map(e => ({
      exerciseId: e.exerciseId,
      sets: Array(e.sets).fill({ reps: e.reps, weight: 0 }),
      notes: '',
    })),
    notes: '',
  });
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { addItem } = useIndexedDB<CompletedWorkout>('completedWorkouts');
  const { toast } = useToast();

  const exerciseMap = new Map(exercises.map(e => [e.id, e]));
  const activeExercise = workoutData.exercises[activeExerciseIndex];
  const activeExerciseDetails = activeExercise ? exerciseMap.get(activeExercise.exerciseId) : null;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleSetUpdate = (setIndex: number, field: keyof ExerciseSet, value: number) => {
    const newExercises = [...workoutData.exercises];
    const sets = [...newExercises[activeExerciseIndex].sets];
    sets[setIndex] = { ...sets[setIndex], [field]: value };
    newExercises[activeExerciseIndex] = { ...newExercises[activeExerciseIndex], sets };
    setWorkoutData({ ...workoutData, exercises: newExercises });
  };

  const handleAddExercise = (exercise: Exercise) => {
    const newExercise: CompletedExercise = {
      exerciseId: exercise.id,
      sets: Array(exercise.defaultSets).fill({
        reps: exercise.defaultReps,
        weight: exercise.defaultWeight || 0,
      }),
      notes: '',
    };
    
    setWorkoutData(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));
    setActiveExerciseIndex(workoutData.exercises.length);
  };

  const handleRemoveExercise = (index: number) => {
    setWorkoutData(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
    if (activeExerciseIndex >= index) {
      setActiveExerciseIndex(Math.max(0, activeExerciseIndex - 1));
    }
  };

  const handleComplete = async () => {
    const completedWorkout = {
      ...workoutData,
      duration: elapsedTime,
    };
    
    const success = await addItem(completedWorkout);
    if (success) {
      toast({
        title: 'Workout completed',
        description: 'Your workout has been saved successfully.',
      });
      onComplete();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save workout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{workoutData.name}</h1>
          <p className="text-muted-foreground">
            {workoutData.exercises.length} exercises
          </p>
        </div>
        <Timer
          seconds={elapsedTime}
          isRunning={isTimerRunning}
          onToggle={() => setIsTimerRunning(!isTimerRunning)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeExerciseDetails && (
            <Card>
              <CardHeader>
                <CardTitle>{activeExerciseDetails.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeExercise.sets.map((set, index) => (
                    <div key={index} className="flex items-end gap-4">
                      <div className="w-16">
                        <Label>Set {index + 1}</Label>
                      </div>
                      {activeExerciseDetails.isWeighted && (
                        <div className="w-24">
                          <Label>Weight ({activeExerciseDetails.weightUnit})</Label>
                          <Input
                            type="number"
                            value={set.weight}
                            onChange={(e) => handleSetUpdate(index, 'weight', Number(e.target.value))}
                          />
                        </div>
                      )}
                      <div className="w-24">
                        <Label>Reps</Label>
                        <Input
                          type="number"
                          value={set.reps}
                          onChange={(e) => handleSetUpdate(index, 'reps', Number(e.target.value))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Exercises</CardTitle>
                <Button size="sm" onClick={() => setIsExerciseSelectorOpen(true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {workoutData.exercises.map((exercise, index) => {
                  const details = exerciseMap.get(exercise.exerciseId);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <Button
                        variant={index === activeExerciseIndex ? 'default' : 'outline'}
                        className="flex-1 justify-start"
                        onClick={() => setActiveExerciseIndex(index)}
                      >
                        {details?.name}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveExercise(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label>Workout Notes</Label>
            <Textarea
              value={workoutData.notes}
              onChange={(e) => setWorkoutData({ ...workoutData, notes: e.target.value })}
              placeholder="Add notes about your workout..."
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel} className="w-full">
              Cancel
            </Button>
            <Button onClick={handleComplete} className="w-full">
              Complete
            </Button>
          </div>
        </div>
      </div>

      <ExerciseSelector
        open={isExerciseSelectorOpen}
        onOpenChange={setIsExerciseSelectorOpen}
        exercises={exercises}
        onSelect={handleAddExercise}
      />
    </div>
  );
}