export type MuscleGroup = 
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Arms'
  | 'Legs'
  | 'Core'
  | 'Full Body';

export type Muscle = 
  | 'Pectoralis'
  | 'Latissimus'
  | 'Deltoids'
  | 'Biceps'
  | 'Triceps'
  | 'Quadriceps'
  | 'Hamstrings'
  | 'Calves'
  | 'Abdominals'
  | 'Trapezius'
  | 'Rhomboids';

export type Category = 
  | 'Strength'
  | 'Cardio'
  | 'Flexibility'
  | 'Balance'
  | 'Power'
  | 'Endurance';

export interface Exercise {
  id: string;
  name: string;
  description?: string;
  muscleGroups: MuscleGroup[];
  muscles: Muscle[];
  category: Category;
  createdAt: number;
  updatedAt: number;
}