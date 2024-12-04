export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const calculateBMR = (weight: number, height: number, age: number, isMale: boolean): number => {
  // Mifflin-St Jeor Equation
  const bmr = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(isMale ? bmr + 5 : bmr - 161);
};

export const calculateIdealWeight = (height: number, isMale: boolean): number => {
  // Devine Formula
  const baseHeight = height - 152.4;
  const baseWeight = isMale ? 50 : 45.5;
  const weightPerCm = isMale ? 2.3 : 2.2;
  return Number((baseWeight + (baseHeight * weightPerCm / 2.54)).toFixed(1));
};