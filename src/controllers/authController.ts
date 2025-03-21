import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validateCredentials } from '../services/userService';
import { ApiError } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

export const login = async (req: Request, res: Response<{ token: string } | ApiError>): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Email and password are required'
      });
      return;
    }

    const user = await validateCredentials(email, password);

    if (!user) {
      res.status(401).json({
        code: 'AUTHENTICATION_ERROR',
        message: 'Invalid email or password'
      });
      return;
    }

    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Login failed',
      details: error instanceof Error ? { message: error.message } : undefined
    });
  }
};