export type ExerciseCategory = 'strength' | 'cardio' | 'flexibility';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  equipment: string[];
  description: string;
  targetMuscles: string[];
  defaultSets: number;
  defaultReps: number;
  defaultDuration: number;
}

export const MUSCLE_GROUPS = [
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Legs',
  'Core',
  'Full Body',
] as const;

export const EQUIPMENT_OPTIONS = [
  'Bodyweight',
  'Dumbbells',
  'Barbell',
  'Kettlebell',
  'Resistance Bands',
  'Machine',
  'Cable',
  'Other',
] as const;