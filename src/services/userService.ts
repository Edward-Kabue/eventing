import { CreationAttributes } from 'sequelize';
import UserModel from '../models/user';
import { User } from '../types';
import { ValidationError } from '../utils/errors';

export const findAll = async (): Promise<User[]> => {
  return UserModel.findAll({
    attributes: { exclude: ['password'] }
  });
};

export const findById = async (id: string): Promise<User | null> => {
  return UserModel.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  if (!userData.password || userData.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters long');
  }
  
  const user = await UserModel.create(userData as any);
  const { password, ...userWithoutPassword } = user.get();
  return userWithoutPassword as User;
};

export const validateCredentials = async (email: string, password: string): Promise<User | null> => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) return null;

  const isValid = await user.validatePassword(password);
  if (!isValid) return null;

  const { password: _, ...userWithoutPassword } = user.get();
  return userWithoutPassword as User;
};

export default {
  findAll,
  findById,
  createUser,
  validateCredentials
};

