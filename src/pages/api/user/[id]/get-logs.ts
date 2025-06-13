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

  const userId = parseInt(id);
  const now = new Date();
  let dateFilter: { gte?: Date; lt?: Date } = {};

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
    case 'year':
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
        userId,
        ...(range !== 'all' ? { date: dateFilter } : {}),
      },
      include: {
        items: {
          include: {
            food: true,
          },
        },
      },
      orderBy: { date: 'asc' },
    });

    if (range === 'today') {
      const foodMap: Record<number, any> = {};
      let foodsConsumed: any[] = [];

      // Akumulasi total untuk hari ini
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

      logs.forEach((log) => {
        log.items.forEach((item) => {
          const { food, quantity } = item;
          if (!food) return;

          const foodId = food.foodId;

          if (!foodMap[foodId]) {
            foodMap[foodId] = {
              foodId,
              name: food.foodName,
              quantity: 0,
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
          }

          foodMap[foodId].quantity += quantity;
          foodMap[foodId].calories += (food.caloricvalue || 0) * quantity;
          foodMap[foodId].fat += (food.fat || 0) * quantity;
          foodMap[foodId].carbs += (food.carbohydrates || 0) * quantity;
          foodMap[foodId].protein += (food.protein || 0) * quantity;
          foodMap[foodId].vitaminc += (food.vitaminc || 0) * quantity;
          foodMap[foodId].calcium += (food.calcium || 0) * quantity;
          foodMap[foodId].iron += (food.iron || 0) * quantity;
          foodMap[foodId].vitamind += (food.vitamind || 0) * quantity;
          foodMap[foodId].potassium += (food.potassium || 0) * quantity;

          totals.calories += (food.caloricvalue || 0) * quantity;
          totals.fat += (food.fat || 0) * quantity;
          totals.carbs += (food.carbohydrates || 0) * quantity;
          totals.protein += (food.protein || 0) * quantity;
          totals.vitaminc += (food.vitaminc || 0) * quantity;
          totals.calcium += (food.calcium || 0) * quantity;
          totals.iron += (food.iron || 0) * quantity;
          totals.vitamind += (food.vitamind || 0) * quantity;
          totals.potassium += (food.potassium || 0) * quantity;
        });
      });

      const roundedTotals = Object.fromEntries(
        Object.entries(totals).map(([k, v]) => [k, Math.round(v * 100) / 100])
      );

      foodsConsumed = Object.values(foodMap).map((food) =>
        Object.fromEntries(
          Object.entries(food).map(([k, v]) => [k, typeof v === 'number' ? Math.round(v * 100) / 100 : v])
        )
      );

      return res.status(200).json({ totals: roundedTotals, foods: foodsConsumed });
    } else {
      
      type NutrientTotals = {
        calories: number;
        fat: number;
        carbs: number;
        protein: number;
        vitaminc: number;
        calcium: number;
        iron: number;
        vitamind: number;
        potassium: number;
      };
      // Group by tanggal
      const dailyTotals: Record<string, NutrientTotals> = {};
      const output: any[] = [];

      const emptyTotals = () => ({
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        vitaminc: 0,
        calcium: 0,
        iron: 0,
        vitamind: 0,
        potassium: 0,
      });

      logs.forEach((log) => {
        const date = log.date;
        const dateKey = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

        if (!dailyTotals[dateKey]) {
          dailyTotals[dateKey] = emptyTotals();
        }

        log.items.forEach((item) => {
          const { food, quantity } = item;
          if (!food) return;

          dailyTotals[dateKey].calories += (food.caloricvalue || 0) * quantity;
          dailyTotals[dateKey].fat += (food.fat || 0) * quantity;
          dailyTotals[dateKey].carbs += (food.carbohydrates || 0) * quantity;
          dailyTotals[dateKey].protein += (food.protein || 0) * quantity;
          dailyTotals[dateKey].vitaminc += (food.vitaminc || 0) * quantity;
          dailyTotals[dateKey].calcium += (food.calcium || 0) * quantity;
          dailyTotals[dateKey].iron += (food.iron || 0) * quantity;
          dailyTotals[dateKey].vitamind += (food.vitamind || 0) * quantity;
          dailyTotals[dateKey].potassium += (food.potassium || 0) * quantity;
        });
      });

      for (const [date, value] of Object.entries(dailyTotals)) {
        output.push({
          date,
          ...Object.fromEntries(Object.entries(value).map(([k, v]) => [k, Math.round(v * 100) / 100])),
        });
      }

      return res.status(200).json({ daily: output });
    }
  } catch (error) {
    console.error('Failed to fetch logs with foods:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}