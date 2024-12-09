"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Exercise, ExerciseCategory, MUSCLE_GROUPS, EQUIPMENT_OPTIONS } from '@/lib/types/exercise';
import { generateExerciseId, validateExercise } from '@/lib/utils/exercise';

interface ExerciseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (exercise: Exercise) => void;
  initialData?: Exercise;
}

export function ExerciseForm({ open, onOpenChange, onSubmit, initialData }: ExerciseFormProps) {
  const [formData, setFormData] = useState<Partial<Exercise>>(
    initialData || {
      name: '',
      category: 'strength',
      equipment: [],
      description: '',
      targetMuscles: [],
      defaultSets: 3,
      defaultReps: 10,
      defaultDuration: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateExercise(formData);
    
    if (errors.length === 0) {
      const exercise: Exercise = {
        ...formData,
        id: initialData?.id || generateExerciseId(),
      } as Exercise;
      
      onSubmit(exercise);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Exercise' : 'Add Exercise'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: ExerciseCategory) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strength">Strength</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
                <SelectItem value="flexibility">Flexibility</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="defaultSets">Default Sets</Label>
              <Input
                id="defaultSets"
                type="number"
                min="1"
                value={formData.defaultSets}
                onChange={(e) =>
                  setFormData({ ...formData, defaultSets: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="defaultReps">Default Reps</Label>
              <Input
                id="defaultReps"
                type="number"
                min="1"
                value={formData.defaultReps}
                onChange={(e) =>
                  setFormData({ ...formData, defaultReps: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Cancel
            </Button>
            <Button type="submit">Save Exercise</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}