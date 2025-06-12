type MacroInput = {
  gender: string;
  weight: number;
  height: number;
  age: number;
  activity: string;
  goal: string;
};

export function calculateMacros({
  gender,
  weight,
  height,
  age,
  activity,
  goal,
}: MacroInput) {
  // Hitung BMR (Mifflin-St Jeor)
  let bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  // Aktivitas multiplier
  const activityMultiplier: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryactive: 1.9,
  };

  const multiplier = activityMultiplier[activity.toLowerCase()] || 1.2;
  const calorieTarget = bmr * multiplier;

  let protein = 0;
  let fat = 0;
  let carbs = 0;

  switch (goal) {
    case 'bodybuilder':
      protein = weight * 2.2; // 2.2g/kg
      fat = (0.25 * calorieTarget) / 9;
      carbs = (calorieTarget - protein * 4 - fat * 9) / 4;
      break;

    case 'keto':
      fat = (0.70 * calorieTarget) / 9;
      protein = (0.20 * calorieTarget) / 4;
      carbs = (0.10 * calorieTarget) / 4;
      break;

    case 'medical':
      protein = weight * 0.8;
      fat = (0.20 * calorieTarget) / 9;
      carbs = (calorieTarget - protein * 4 - fat * 9) / 4;
      break;

    case 'standard':
    default:
      protein = weight * 1.2;
      fat = (0.30 * calorieTarget) / 9;
      carbs = (calorieTarget - protein * 4 - fat * 9) / 4;
      break;
  }

  return {
    calories: Math.round(calorieTarget),
    protein: Math.round(protein),
    fat: Math.round(fat),
    carbs: Math.round(carbs),
  };
}
