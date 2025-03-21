import { Request, Response } from 'express';
import { User, ApiError } from '../types';
import * as userService from '../services/userService';

export const getAll = async (req: Request, res: Response<User[] | ApiError>): Promise<void> => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Failed to fetch users'
    });
  }
};

export const getById = async (req: Request, res: Response<User | ApiError>): Promise<void> => {
  try {
    const user = await userService.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        code: 'NOT_FOUND',
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Failed to fetch user'
    });
  }
};

export const create = async (req: Request, res: Response<User | ApiError>): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Failed to create user',
      details: error instanceof Error ? { message: error.message } : undefined
    });
  }
};

export default {
  getAll,
  getById,
  create
};



