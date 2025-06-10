import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = parseInt(req.query.id as string);

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: 'Valid userId is required in the URL.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { foodId } = req.body;

  if (!foodId) {
    return res.status(400).json({ message: 'foodId is required.' });
  }

  try {
    await prisma.favoriteFood.delete({
      where: {
        userId_foodId: { userId, foodId },
      },
    });

    return res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}