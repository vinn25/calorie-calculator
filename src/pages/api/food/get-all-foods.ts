import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    const data = await prisma.food.findMany({
      select: {
        foodId: true,
        foodName: true,
        caloricvalue: true,
        protein: true,
        fat: true,
        carbohydrates: true,
        vitaminc: true,
        calcium: true,
        iron: true,
        vitamind: true,
        potassium: true,
      }
    });

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}