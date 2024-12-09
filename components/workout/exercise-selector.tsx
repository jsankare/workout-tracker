"use client";

import { Exercise } from '@/lib/types/exercise';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface ExerciseSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exercises: Exercise[];
  onSelect: (exercise: Exercise) => void;
}

export function ExerciseSelector({
  open,
  onOpenChange,
  exercises,
  onSelect,
}: ExerciseSelectorProps) {
  const [search, setSearch] = useState('');

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 max-h-[400px] overflow-y-auto">
          {filteredExercises.map((exercise) => (
            <Button
              key={exercise.id}
              variant="outline"
              className="flex flex-col items-start h-auto p-4 space-y-2"
              onClick={() => {
                onSelect(exercise);
                onOpenChange(false);
              }}
            >
              <div className="font-medium">{exercise.name}</div>
              <div className="flex flex-wrap gap-1">
                {exercise.targetMuscles.map((muscle) => (
                  <Badge key={muscle} variant="secondary" className="text-xs">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}