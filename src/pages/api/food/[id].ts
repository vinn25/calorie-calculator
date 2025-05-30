import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const data = await prisma.food.findUnique({
      where: {
        foodId: Number(id),
      },
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

    if (!data) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching food by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}