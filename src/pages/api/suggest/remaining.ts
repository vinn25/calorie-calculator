import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const userId = parseInt(req.query.userId as string);
  if (!userId) return res.status(400).json({ message: 'userId is required' });

  try {
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const logs = await prisma.mealLog.findMany({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        items: {
          include: { food: true },
        },
      },
    });

    const totals = logs.reduce(
      (acc, log) => {
        for (const item of log.items) {
          const qty = item.quantity;
          const food = item.food;
          acc.calories += (food.caloricvalue || 0) * qty;
          acc.protein += (food.protein || 0) * qty;
          acc.fat += (food.fat || 0) * qty;
          acc.carbs += (food.carbohydrates || 0) * qty;
        }
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );

    const remaining = {
      calories: user.calorieTarget - totals.calories,
      protein: user.proteinTarget - totals.protein,
      fat: user.fatTarget - totals.fat,
      carbs: user.carbTarget - totals.carbs,
    };

    const foods = await prisma.food.findMany();

    const suggestions = foods
      .map((food) => {
        const score =
          Math.abs((remaining.calories || 0) - (food.caloricvalue || 0)) +
          Math.abs((remaining.protein || 0) - (food.protein || 0)) +
          Math.abs((remaining.fat || 0) - (food.fat || 0)) +
          Math.abs((remaining.carbs || 0) - (food.carbohydrates || 0));
        return { food, score };
      })
      .sort((a, b) => a.score - b.score)
      .slice(0, 5);
    res.status(200).json({
      remaining: {
        calories: Math.max(0, Math.round(remaining.calories)),
        protein: Math.max(0, Math.round(remaining.protein)),
        fat: Math.max(0, Math.round(remaining.fat)),
        carbs: Math.max(0, Math.round(remaining.carbs)),
      },
      suggestions: suggestions.map((s) => s.food),
    });
  } catch (error) {
    console.error('Meal Suggestion Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}