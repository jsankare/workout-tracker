export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  height?: number; // in cm
  weight?: number; // in kg
  age?: number;
  gender?: Gender;
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: string;
  bmr: number; // Basal Metabolic Rate
  idealWeight: number;
}