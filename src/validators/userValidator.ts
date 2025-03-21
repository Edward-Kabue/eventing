import { User } from '../types';
import { ValidationError } from '../utils/errors';

export const validateCreateUser = (data: Partial<User>): void => {
  if (!data.name) {
    throw new ValidationError('Name is required');
  }
  if (!data.email) {
    throw new ValidationError('Email is required');
  }
  if (data.email && !isValidEmail(data.email)) {
    throw new ValidationError('Invalid email format');
  }
  if (!data.password) {
    throw new ValidationError('Password is required');
  }
  if (data.password && data.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters long');
  }
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
