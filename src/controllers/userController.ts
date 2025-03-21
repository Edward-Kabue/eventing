import { Request, Response } from 'express';
import UserModel from '../models/user';
import { User, ApiError } from '../types';

export class UserController {
  public async getAll(req: Request, res: Response<User[] | ApiError>): Promise<void> {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch users'
      });
    }
  }

  public async getById(req: Request, res: Response<User | ApiError>): Promise<void> {
    try {
      const user = await UserModel.findByPk(req.params.id);
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
  }
  public async create(req: Request, res: Response<User | ApiError>): Promise<void> {
    try {
      const user = await UserModel.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({
        "code": "INTERNAL_ERROR",
        "message": "Failed to create user",
        "details": error instanceof Error ? { "message": error.message } : undefined
      });
    }
  }
}

export default new UserController();

