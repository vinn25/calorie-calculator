import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { calculateMacros } from '@/utils/calculateMacros';
import { getWHOMicronutrientTargets } from '@/utils/calculateMicros';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = parseInt(req.query.id as string);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  switch (req.method) {
    case 'GET':
      return getUserProfile(userId, res);
    case 'PUT':
      return updateUserProfile(userId, req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function getUserProfile(userId: number, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        email: true,
        age: true,
        gender: true,
        height: true,
        weight: true,
        activity: true,
        goal: true,
        calorieTarget: true,
        proteinTarget: true,
        fatTarget: true,
        carbTarget: true,
        vitaminCTarget: true,
        calciumTarget: true,
        ironTarget: true,
        vitaminDTarget: true,
        potassiumTarget: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateUserProfile(userId: number, req: NextApiRequest, res: NextApiResponse) {
  const {
    email,
    age,
    gender,
    height,
    weight,
    activity,
    goal,
  } = req.body;

  try {
    // Hitung ulang target makronutrien
    const { calories, protein, fat, carbs } = calculateMacros({
      gender,
      weight,
      height,
      age,
      activity,
      goal,
    });

    // Hitung ulang target mikronutrien WHO
    const micronutrients = getWHOMicronutrientTargets(gender);

    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        email,
        age,
        gender,
        height,
        weight,
        activity,
        goal,
        calorieTarget: calories,
        proteinTarget: protein,
        fatTarget: fat,
        carbTarget: carbs,
        ...micronutrients,
      },
    });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}