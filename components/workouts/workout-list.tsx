'use client';

import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Workout {
  id: string;
  name: string;
  date: Date;
  duration: number;
  exercises: Array<{
    exerciseId: string;
    sets?: Array<{
      reps?: number;
      weight?: number;
      duration?: number;
      distance?: number;
    }>;
  }>;
}

interface WorkoutListProps {
  workouts: Workout[];
}

export function WorkoutList({ workouts }: WorkoutListProps) {
  if (workouts.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">No workouts found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <Card key={workout.id}>
          <CardHeader>
            <CardTitle>{workout.name}</CardTitle>
            <CardDescription>
              {format(new Date(workout.date), 'PPP')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Duration:</span>
                <span>{Math.floor(workout.duration / 60)} minutes</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Exercises:</span>
                <span>{workout.exercises.length}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary">
                  {workout.exercises.reduce(
                    (total, ex) => total + (ex.sets?.length || 0),
                    0
                  )}{' '}
                  sets
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}