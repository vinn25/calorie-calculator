import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'; 
import { calculateMacros } from '@/utils/calculateMacros';
import { getWHOMicronutrientTargets } from '@/utils/calculateMicros';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, activity, age, gender, height, weight, goal } = req.body as {
    email: string;
    password: string;
    activity: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
    goal: string;
  };

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { calories, protein, fat, carbs } = calculateMacros({
    gender,
    weight,
    height,
    age,
    activity,
    goal,
  });
  const micronutrients = getWHOMicronutrientTargets(gender);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      activity,
      age,
      gender,
      height,
      weight,
      calorieTarget: calories,
      proteinTarget: protein,
      fatTarget: fat,
      carbTarget: carbs,
      ...micronutrients
    },
  });

  res.status(201).json({ message: 'User registered successfully'});
}

