import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, activity, age, gender, height, weight } = req.body as 
        { email: string; 
          password: string; 
          activity: string;
          age: number;
          gender: string;
          height: number;
          weight: number;
        };
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      activity,
      age,
      gender,
      height,
      weight,
    },
  });

  res.status(201).json({ message: 'User registered successfully' });
}