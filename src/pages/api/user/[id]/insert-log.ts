import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userId = parseInt(req.query.id as string);
  const { date, mealType, item, notes } = req.body;

  // Validasi input
  if (!userId || !date || !mealType || !item || typeof item !== 'object') {
    return res.status(400).json({ error: 'Missing or invalid required fields' });
  }

  const { foodId, quantity } = item;

  if (!foodId || !quantity) {
    return res.status(400).json({ error: 'Item must include foodId and quantity' });
  }

  try {
    const mealLog = await prisma.mealLog.create({
      data: {
        userId,
        date: new Date(date),
        mealType,
        notes,
        items: {
          create: {
            foodId,
            quantity,
          },
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

    return res.status(201).json({ message: 'Success to log food intake', mealLog });
  } catch (error) {
    console.error('Error creating meal log:', error);
    return res.status(500).json({ error: 'Failed to log food intake' });
  }
}