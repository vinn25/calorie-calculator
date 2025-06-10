import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = parseInt(req.query.id as string);

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: 'Valid userId is required in the URL.' });
  }

  if (req.method === 'GET') {
    try {
      const favorites = await prisma.favoriteFood.findMany({
        where: { userId },
        include: {
          food: true,
        },
      });

      return res.status(200).json({ favorites });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to fetch favorites' });
    }
  }

  if (req.method === 'POST') {
    const { foodId, quantity } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: 'foodId is required.' });
    }

    try {
      const favorite = await prisma.favoriteFood.upsert({
        where: {
          userId_foodId: { userId, foodId },
        },
        update: {
          quantity: quantity ?? 1,
        },
        create: {
          userId,
          foodId,
          quantity: quantity ?? 1,
        },
      });

      return res.status(201).json({ message: 'Favorite saved', favorite });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: 'foodId is required to delete.' });
    }

    try {
      await prisma.favoriteFood.delete({
        where: {
          userId_foodId: { userId, foodId },
        },
      });

      return res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}