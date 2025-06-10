import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getTodayDateRange } from '@/utils/dateHelper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const { startOfDay, endOfDay } = getTodayDateRange();

  try {
    const user = await prisma.user.findUnique({
      where: { userId: parseInt(id) },
      select: {
        calorieTarget: true,
        proteinTarget: true,
        fatTarget: true,
        carbTarget: true,
      },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Ambil meal logs hari ini
    const logs = await prisma.mealLog.findMany({
      where: {
        userId: parseInt(id),
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        items: {
          include: {
            food: true,
          },
        },
      },
    });

    // Hitung total konsumsi
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

    // Cek status konsumsi terhadap target
    const alerts: string[] = [];

    if (totals.calories < user.calorieTarget) alerts.push('Calories below target');
    else if (totals.calories > user.calorieTarget) alerts.push('Calories exceed target');

    if (totals.protein < user.proteinTarget) alerts.push('Protein below target');
    else if (totals.protein > user.proteinTarget) alerts.push('Protein exceed target');

    if (totals.fat < user.fatTarget) alerts.push('Fat below target');
    else if (totals.fat > user.fatTarget) alerts.push('Fat exceed target');

    if (totals.carbs < user.carbTarget) alerts.push('Carbohydrates below target');
    else if (totals.carbs > user.carbTarget) alerts.push('Carbohydrates exceed target');

    res.status(200).json({
      totals,
      targets: user,
      alerts,
    });
  } catch (error) {
    console.error('Error in nutrition gap check:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}