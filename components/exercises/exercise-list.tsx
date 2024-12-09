"use client";

import { Exercise } from '@/lib/types/exercise';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Clock, Stretch } from 'lucide-react';

interface ExerciseListProps {
  exercises: Exercise[];
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  const getCategoryIcon = (category: Exercise['category']) => {
    switch (category) {
      case 'strength':
        return <Dumbbell className="h-4 w-4" />;
      case 'cardio':
        return <Clock className="h-4 w-4" />;
      case 'flexibility':
        return <Stretch className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exercises.map((exercise) => (
        <Card key={exercise.id}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {getCategoryIcon(exercise.category)}
              <Badge>{exercise.category}</Badge>
            </div>
            <CardTitle>{exercise.name}</CardTitle>
            <CardDescription>{exercise.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex gap-2 flex-wrap">
                {exercise.targetMuscles.map((muscle) => (
                  <Badge key={muscle} variant="outline">
                    {muscle}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                {exercise.defaultSets} sets × {exercise.defaultReps} reps
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}