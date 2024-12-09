"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Exercise, ExerciseCategory, MUSCLE_GROUPS, EQUIPMENT_OPTIONS, WEIGHT_UNITS } from '@/lib/types/exercise';
import { generateExerciseId, validateExercise } from '@/lib/utils/exercise';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';

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
      defaultWeight: 0,
      weightUnit: 'kg',
      isWeighted: false,
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

  const toggleMuscleGroup = (muscle: string) => {
    const muscles = formData.targetMuscles || [];
    const newMuscles = muscles.includes(muscle)
      ? muscles.filter(m => m !== muscle)
      : [...muscles, muscle];
    setFormData({ ...formData, targetMuscles: newMuscles });
  };

  const toggleEquipment = (equipment: string) => {
    const equipmentList = formData.equipment || [];
    const newEquipment = equipmentList.includes(equipment)
      ? equipmentList.filter(e => e !== equipment)
      : [...equipmentList, equipment];
    setFormData({ ...formData, equipment: newEquipment });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
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
            <Label>Target Muscles</Label>
            <div className="flex flex-wrap gap-2">
              {MUSCLE_GROUPS.map((muscle) => (
                <Badge
                  key={muscle}
                  variant={formData.targetMuscles?.includes(muscle) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleMuscleGroup(muscle)}
                >
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Equipment</Label>
            <div className="flex flex-wrap gap-2">
              {EQUIPMENT_OPTIONS.map((equipment) => (
                <Badge
                  key={equipment}
                  variant={formData.equipment?.includes(equipment) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleEquipment(equipment)}
                >
                  {equipment}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isWeighted"
              checked={formData.isWeighted}
              onCheckedChange={(checked) => setFormData({ ...formData, isWeighted: checked })}
            />
            <Label htmlFor="isWeighted">Track weight for this exercise</Label>
          </div>

          {formData.isWeighted && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="defaultWeight">Default Weight</Label>
                <Input
                  id="defaultWeight"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.defaultWeight}
                  onChange={(e) =>
                    setFormData({ ...formData, defaultWeight: parseFloat(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weightUnit">Weight Unit</Label>
                <Select
                  value={formData.weightUnit}
                  onValueChange={(value: 'kg' | 'lbs') =>
                    setFormData({ ...formData, weightUnit: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultSets">Default Sets</Label>
              <Input
                id="defaultSets"
                type="number"
                min="0"
                value={formData.defaultSets}
                onChange={(e) =>
                  setFormData({ ...formData, defaultSets: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultReps">Default Reps</Label>
              <Input
                id="defaultReps"
                type="number"
                min="0"
                value={formData.defaultReps}
                onChange={(e) =>
                  setFormData({ ...formData, defaultReps: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultDuration">Duration (sec)</Label>
              <Input
                id="defaultDuration"
                type="number"
                min="0"
                value={formData.defaultDuration}
                onChange={(e) =>
                  setFormData({ ...formData, defaultDuration: parseInt(e.target.value) })
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