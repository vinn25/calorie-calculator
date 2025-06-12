import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { query, userId } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const allFoods = await prisma.food.findMany({
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
        FavoriteFood: typeof userId === 'string'
          ? {
              where: {
                userId: parseInt(userId),
              },
              select: {
                id: true,
              },
            }
          : false,
      },
    });

    const queryLower = query.toLowerCase();

    // Filter berdasarkan nama makanan
    const filtered = allFoods.filter(item =>
      item.foodName.toLowerCase().includes(queryLower)
    );

    // Tambahkan properti isFavorite
    const result = filtered.map(({ FavoriteFood, ...rest }) => ({
      ...rest,
      isFavorite: FavoriteFood && Array.isArray(FavoriteFood) && FavoriteFood.length > 0,
    }));

    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error searching foods:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
