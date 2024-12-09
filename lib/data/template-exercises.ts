import { Exercise } from '../types/exercise';

export const templateExercises: Exercise[] = [
  {
    id: 'ex_bench_press',
    name: 'Bench Press',
    category: 'strength',
    equipment: ['Barbell'],
    description: 'Lie on a flat bench and press the barbell up from your chest.',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
    defaultSets: 3,
    defaultReps: 10,
    defaultDuration: 0,
  },
  {
    id: 'ex_squat',
    name: 'Squat',
    category: 'strength',
    equipment: ['Barbell'],
    description: 'Stand with the barbell on your upper back and squat down until your thighs are parallel to the ground.',
    targetMuscles: ['Legs', 'Core'],
    defaultSets: 3,
    defaultReps: 8,
    defaultDuration: 0,
  },
  {
    id: 'ex_deadlift',
    name: 'Deadlift',
    category: 'strength',
    equipment: ['Barbell'],
    description: 'Lift a barbell from the ground while keeping your back straight.',
    targetMuscles: ['Back', 'Legs', 'Core'],
    defaultSets: 3,
    defaultReps: 8,
    defaultDuration: 0,
  },
  {
    id: 'ex_pushup',
    name: 'Push-up',
    category: 'strength',
    equipment: ['Bodyweight'],
    description: 'Perform a pushing motion with your body weight, keeping your core tight.',
    targetMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    defaultSets: 3,
    defaultReps: 12,
    defaultDuration: 0,
  },
  {
    id: 'ex_plank',
    name: 'Plank',
    category: 'strength',
    equipment: ['Bodyweight'],
    description: 'Hold a push-up position with your forearms on the ground.',
    targetMuscles: ['Core'],
    defaultSets: 3,
    defaultReps: 0,
    defaultDuration: 60,
  },
];