export function getWHOMicronutrientTargets(gender: string) {
  const lowerGender = gender.toLowerCase();

  return {
    vitaminCTarget: lowerGender === 'male' ? 90 : 75,         // mg
    calciumTarget: 1000,                                      // mg
    ironTarget: lowerGender === 'male' ? 8 : 18,              // mg
    vitaminDTarget: 15,                                       // µg
    potassiumTarget: lowerGender === 'male' ? 3400 : 2600,    // mg
  };
}