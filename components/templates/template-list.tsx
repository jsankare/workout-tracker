"use client";

import { WorkoutTemplate } from '@/lib/types/workout';
import { Exercise } from '@/lib/types/exercise';
import { useIndexedDB } from '@/lib/hooks/use-indexeddb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';
import { calculateEstimatedDuration } from '@/lib/utils/workout';

interface TemplateListProps {
  templates: WorkoutTemplate[];
  onToggleFavorite: (template: WorkoutTemplate) => void;
}

export function TemplateList({ templates, onToggleFavorite }: TemplateListProps) {
  const { data: exercises } = useIndexedDB<Exercise[]>('exercises');
  const exerciseMap = new Map(exercises?.map(e => [e.id, e]));

  const sortedTemplates = [...templates].sort((a, b) => {
    if (a.isFavorite === b.isFavorite) {
      return a.name.localeCompare(b.name);
    }
    return a.isFavorite ? -1 : 1;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedTemplates.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{template.name}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleFavorite(template)}
                className={template.isFavorite ? 'text-yellow-500' : ''}
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {calculateEstimatedDuration(template.exercises)} min
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Exercises:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {template.exercises.map((exercise) => {
                  const exerciseDetails = exerciseMap.get(exercise.exerciseId);
                  return (
                    <li key={exercise.exerciseId}>
                      {exerciseDetails?.name} - {exercise.sets} × {exercise.reps}
                    </li>
                  );
                })}
              </ul>
              {template.notes && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium">Notes:</h3>
                  <p className="text-sm text-muted-foreground">{template.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}