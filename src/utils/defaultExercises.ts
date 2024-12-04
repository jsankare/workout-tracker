import { Exercise, ExerciseType, MuscleGroup, Muscle } from '../types/exercise';
import { v4 as uuidv4 } from 'uuid';

export const defaultExercises: Omit<Exercise, 'id'>[] = [
  {
    name: 'Push-ups',
    type: ExerciseType.BODYWEIGHT,
    muscleGroups: [MuscleGroup.CHEST, MuscleGroup.ARMS],
    muscles: [Muscle.PECTORALIS, Muscle.DELTOIDS, Muscle.TRICEPS],
    description: 'Classic bodyweight exercise for upper body strength',
    instructions: 'Start in plank position, lower body until chest nearly touches ground, push back up',
    caloriesPerMinute: 7
  },
  {
    name: 'Squats',
    type: ExerciseType.BODYWEIGHT,
    muscleGroups: [MuscleGroup.LEGS],
    muscles: [Muscle.QUADRICEPS, Muscle.HAMSTRINGS],
    description: 'Fundamental lower body exercise',
    instructions: 'Stand with feet shoulder-width apart, lower body as if sitting back into a chair',
    caloriesPerMinute: 8
  },
  {
    name: 'Bench Press',
    type: ExerciseType.STRENGTH,
    muscleGroups: [MuscleGroup.CHEST, MuscleGroup.ARMS],
    muscles: [Muscle.PECTORALIS, Muscle.DELTOIDS, Muscle.TRICEPS],
    description: 'Classic strength training exercise for chest and triceps',
    instructions: 'Lie on bench, lower barbell to chest, press up to starting position',
    caloriesPerMinute: 6
  },
  {
    name: 'Deadlift',
    type: ExerciseType.STRENGTH,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.LEGS],
    muscles: [Muscle.LATISSIMUS, Muscle.HAMSTRINGS],
    description: 'Compound exercise for overall strength',
    instructions: 'Bend at hips and knees to grip barbell, lift by extending hips and knees',
    caloriesPerMinute: 9
  },
  {
    name: 'Running',
    type: ExerciseType.CARDIO,
    muscleGroups: [MuscleGroup.LEGS],
    muscles: [Muscle.QUADRICEPS, Muscle.CALVES],
    description: 'Basic cardio exercise for endurance',
    instructions: 'Maintain steady pace, keep proper form',
    caloriesPerMinute: 10
  },
  {
    name: 'Plank',
    type: ExerciseType.BODYWEIGHT,
    muscleGroups: [MuscleGroup.CORE],
    muscles: [Muscle.ABDOMINALS],
    description: 'Core strengthening isometric exercise',
    instructions: 'Hold push-up position with forearms on ground, maintain straight body',
    caloriesPerMinute: 4
  },
  {
    name: 'Pull-ups',
    type: ExerciseType.BODYWEIGHT,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.ARMS],
    muscles: [Muscle.LATISSIMUS, Muscle.BICEPS],
    description: 'Upper body pulling exercise',
    instructions: 'Hang from bar, pull body up until chin over bar',
    caloriesPerMinute: 8
  },
  {
    name: 'Burpees',
    type: ExerciseType.HIIT,
    muscleGroups: [MuscleGroup.LEGS, MuscleGroup.CHEST, MuscleGroup.CORE],
    muscles: [Muscle.QUADRICEPS, Muscle.PECTORALIS, Muscle.ABDOMINALS],
    description: 'Full-body high-intensity exercise',
    instructions: 'Drop to push-up, perform push-up, jump feet forward, jump up',
    caloriesPerMinute: 12
  }
];

export const initializeDefaultExercises = async (db: any) => {
  const existingExercises = await db.getAll('exercises');
  if (existingExercises.length === 0) {
    for (const exercise of defaultExercises) {
      await db.add('exercises', { ...exercise, id: uuidv4() });
    }
  }
};