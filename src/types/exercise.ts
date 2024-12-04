export enum ExerciseType {
  CARDIO = 'cardio',
  STRENGTH = 'strength',
  STRETCHING = 'stretching',
  BODYWEIGHT = 'bodyweight',
  HIIT = 'hiit'
}

export enum MuscleGroup {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders',
  ARMS = 'arms',
  LEGS = 'legs',
  CORE = 'core'
}

export enum Muscle {
  PECTORALIS = 'pectoralis',
  DELTOIDS = 'deltoids',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  LATISSIMUS = 'latissimus',
  TRAPEZIUS = 'trapezius',
  QUADRICEPS = 'quadriceps',
  HAMSTRINGS = 'hamstrings',
  CALVES = 'calves',
  ABDOMINALS = 'abdominals',
  OBLIQUES = 'obliques'
}

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  muscleGroups: MuscleGroup[];
  muscles: Muscle[];
  description?: string;
  instructions?: string;
}