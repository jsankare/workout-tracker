export const MUSCLE_GROUPS = {
  UPPER_BODY: 'Upper Body',
  LOWER_BODY: 'Lower Body',
  CORE: 'Core',
  FULL_BODY: 'Full Body',
} as const;

export const SPECIFIC_MUSCLES = {
  CHEST: 'Chest',
  BACK: 'Back',
  SHOULDERS: 'Shoulders',
  BICEPS: 'Biceps',
  TRICEPS: 'Triceps',
  QUADRICEPS: 'Quadriceps',
  HAMSTRINGS: 'Hamstrings',
  CALVES: 'Calves',
  ABS: 'Abs',
} as const;

export const EXERCISE_TYPES = {
  STRENGTH: 'Strength Training',
  CARDIO: 'Cardio',
  STRETCHING: 'Stretching',
  BODYWEIGHT: 'Bodyweight',
  PLYOMETRICS: 'Plyometrics',
} as const;

export const THEME = {
  colors: {
    primary: 'hsl(32, 95%, 44%)', // Warrior Orange
    secondary: 'hsl(27, 51%, 29%)', // Earth Brown
    accent: 'hsl(14, 72%, 39%)', // Terra Cotta
    background: {
      dark: 'hsl(20, 14%, 4%)', // Deep Dark
      light: 'hsl(27, 10%, 90%)', // Light Sand
    },
    text: {
      primary: 'hsl(0, 0%, 100%)',
      secondary: 'hsl(27, 10%, 75%)',
    },
  },
  patterns: {
    tribal: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M30 5L5 30l25 25 25-25z' stroke='rgba(255,255,255,0.05)' fill='none'/%3E%3C/svg%3E")`,
  },
};