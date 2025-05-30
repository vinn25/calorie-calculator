import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    // Ambil semua data yang relevan dari database
    const allFoods = await prisma.food.findMany({
      select: {
        foodId: true,
        foodName: true,
        // category: true,
        caloricvalue: true,
        protein: true,
        fat: true,
        carbohydrates: true,
        vitaminc: true,
        calcium: true,
        iron: true,
        vitamind: true,
        potassium: true,
      },
    });

    const queryLower = query.toLowerCase();

    // Filter data di JavaScript menggunakan lowercase
    const data = allFoods.filter(item =>
      item.foodName.toLowerCase().includes(queryLower) 
    //   ||
    //   item.category.toLowerCase().includes(queryLower)
    );


    res.status(200).json({ data });
  } catch (error) {
    console.error('Error searching foods:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}