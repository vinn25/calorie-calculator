import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;
  const range = (req.query.range as string) || 'today';

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'User ID is required' });
  }

  let dateFilter: { gte?: Date; lt?: Date } = {};
  const now = new Date();

  switch (range) {
    case 'today':
      dateFilter = {
        gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      };
      break;
    case 'week':
      dateFilter = {
        gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        lt: now,
      };
      break;
    case 'month':
      dateFilter = {
        gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        lt: now,
      };
      break;
    case '3months':
      dateFilter = {
        gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
        lt: now,
      };
      break;
    case '6months':
      dateFilter = {
        gte: new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000),
        lt: now,
      };
      break;
    case '1year':
      dateFilter = {
        gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
        lt: now,
      };
      break;
    case 'all':
      dateFilter = {};
      break;
    default:
      return res.status(400).json({
        message: 'Invalid range. Use: today, week, month, 3months, 6months, 1year, or all',
      });
  }

  try {
    const logs = await prisma.mealLog.findMany({
      where: {
        userId: parseInt(id),
        ...(range !== 'all' ? { date: dateFilter } : {}),
      },
      include: {
        items: {
          include: {
            food: true, // Join ke Food untuk dapatkan data nutrisinya
          },
        },
      },
    });

    const totals = {
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
      vitaminc: 0,
      calcium: 0,
      iron: 0,
      vitamind: 0,
      potassium: 0,
    };

    const foodsConsumed: any[] = [];

    logs.forEach((log) => {
      log.items.forEach((item) => {
        const { food, quantity } = item;
        if (!food) return;

        const entry = {
          foodId: food.foodId,
          name: food.foodName,
          quantity,
          calories: (food.caloricvalue || 0) * quantity,
          fat: (food.fat || 0) * quantity,
          carbs: (food.carbohydrates || 0) * quantity,
          protein: (food.protein || 0) * quantity,
          vitaminc: (food.vitaminc || 0) * quantity,
          calcium: (food.calcium || 0) * quantity,
          iron: (food.iron || 0) * quantity,
          vitamind: (food.vitamind || 0) * quantity,
          potassium: (food.potassium || 0) * quantity,
        };

        foodsConsumed.push(entry);

        totals.calories += entry.calories;
        totals.fat += entry.fat;
        totals.carbs += entry.carbs;
        totals.protein += entry.protein;
        totals.vitaminc += entry.vitaminc;
        totals.calcium += entry.calcium;
        totals.iron += entry.iron;
        totals.vitamind += entry.vitamind;
        totals.potassium += entry.potassium;
      });
    });

    const roundedTotals = Object.fromEntries(
      Object.entries(totals).map(([k, v]) => [k, Math.round(v * 100) / 100])
    );

    res.status(200).json({
      totals: roundedTotals,
      foods: foodsConsumed,
    });
  } catch (error) {
    console.error('Failed to fetch logs with foods:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }



}