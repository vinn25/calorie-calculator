import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    const foods = await prisma.food.findMany({
      select: {
        id: true,
        food: true,
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

    const data = foods.map(item => ({
      id: item.id,
      name: item.food,
      caloricvalue: item.caloricvalue,
      protein: item.protein,
      fat: item.fat,
      carbohydrates: item.carbohydrates,
      vitaminc: item.vitaminc,
      calcium: item.calcium,
      iron: item.iron,
      vitamind: item.vitamind,
      potassium: item.potassium,
    }));

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}