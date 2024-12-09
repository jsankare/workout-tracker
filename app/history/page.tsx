"use client";

import { useIndexedDB } from '@/lib/hooks/use-indexeddb';
import { CompletedWorkout } from '@/lib/types/workout';
import { Exercise } from '@/lib/types/exercise';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';

export default function HistoryPage() {
  const { data: workouts, loading: loadingWorkouts } = useIndexedDB<CompletedWorkout[]>('completedWorkouts');
  const { data: exercises, loading: loadingExercises } = useIndexedDB<Exercise[]>('exercises');

  if (loadingWorkouts || loadingExercises) {
    return <div>Loading...</div>;
  }

  const sortedWorkouts = [...(workouts || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const exerciseMap = new Map(exercises?.map(e => [e.id, e]));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Workout History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedWorkouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader>
              <CardTitle>{workout.name}</CardTitle>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(workout.date), 'PPP')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {Math.floor(workout.duration / 60)} min
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {workout.exercises.map((exercise, index) => {
                  const exerciseDetails = exerciseMap.get(exercise.exerciseId);
                  return (
                    <div key={index} className="text-sm">
                      <div className="font-medium">{exerciseDetails?.name}</div>
                      <div className="text-muted-foreground">
                        {exercise.sets.map((set, setIndex) => (
                          <span key={setIndex}>
                            {setIndex > 0 && ' | '}
                            {set.weight ? `${set.weight}${exerciseDetails?.weightUnit} × ` : ''}
                            {set.reps} reps
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {workout.notes && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p className="font-medium">Notes:</p>
                    <p>{workout.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}