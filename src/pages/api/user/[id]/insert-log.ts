import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = parseInt(req.query.id as string);
  const { date, mealType, items, notes } = req.body;

  if (!userId || !date || !mealType || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Buat entri MealLog
    const mealLog = await prisma.mealLog.create({
      data: {
        userId,
        date: new Date(date),
        mealType,
        notes,
        items: {
          create: items.map((item: { foodId: number, quantity: number }) => ({
            foodId: item.foodId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json({message: "Success to log food intake"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log food intake' });
  }
}