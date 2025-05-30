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
            food: true, // untuk detail makanan
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    res.status(200).json({ data: logs });
  } catch (error) {
    console.error('Error fetching meal logs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}