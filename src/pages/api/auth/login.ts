import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body as { email: string; password: string };

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    // Generate Access Token (expires in 15 minutes)
    const accessToken = jwt.sign(
      { id: user.userId, email: user.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Generate Refresh Token (expires in 7 days)
    const refreshToken = jwt.sign(
      { id: user.userId, email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Optional: Save refresh token to DB for revocation support
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { refreshToken }
    // });

    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({ data: {
      accessToken, 
      refreshToken,
      user: userWithoutPassword
    }});

  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
}