"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Exercise } from '@/lib/types/exercise';
import { WorkoutTemplate, WorkoutExercise } from '@/lib/types/workout';
import { useIndexedDB } from '@/lib/hooks/use-indexeddb';
import { generateWorkoutId, validateWorkoutTemplate } from '@/lib/utils/workout';
import { Plus, Trash2 } from 'lucide-react';

interface TemplateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (template: WorkoutTemplate) => void;
  initialData?: WorkoutTemplate;
}

export function TemplateForm({ open, onOpenChange, onSubmit, initialData }: TemplateFormProps) {
  const { data: exercises } = useIndexedDB<Exercise[]>('exercises');
  const [formData, setFormData] = useState<Partial<WorkoutTemplate>>(
    initialData || {
      name: '',
      exercises: [],
      notes: '',
      isFavorite: false,
    }
  );

  const handleAddExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...(formData.exercises || []),
        { exerciseId: '', sets: 3, reps: 10, duration: 0 },
      ],
    });
  };

  const handleRemoveExercise = (index: number) => {
    const newExercises = [...(formData.exercises || [])];
    newExercises.splice(index, 1);
    setFormData({ ...formData, exercises: newExercises });
  };

  const handleExerciseChange = (index: number, field: keyof WorkoutExercise, value: any) => {
    const newExercises = [...(formData.exercises || [])];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setFormData({ ...formData, exercises: newExercises });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateWorkoutTemplate(formData);
    
    if (errors.length === 0) {
      const template: WorkoutTemplate = {
        ...formData,
        id: initialData?.id || generateWorkoutId(),
      } as WorkoutTemplate;
      
      onSubmit(template);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Template' : 'Create Template'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Template Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Exercises</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddExercise}>
                <Plus className="h-4 w-4 mr-2" />
                Add Exercise
              </Button>
            </div>
            
            {formData.exercises?.map((exercise, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label>Exercise</Label>
                  <Select
                    value={exercise.exerciseId}
                    onValueChange={(value) => handleExerciseChange(index, 'exerciseId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exercise" />
                    </SelectTrigger>
                    <SelectContent>
                      {exercises?.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-20">
                  <Label>Sets</Label>
                  <Input
                    type="number"
                    min="1"
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(index, 'sets', parseInt(e.target.value))}
                  />
                </div>
                <div className="w-20">
                  <Label>Reps</Label>
                  <Input
                    type="number"
                    min="1"
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, 'reps', parseInt(e.target.value))}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveExercise(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Cancel
            </Button>
            <Button type="submit">Save Template</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}