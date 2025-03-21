import UserModel from "../models/user";
import { CreateUserInput, User } from "../types";
import { ValidationError } from "../utils/errors";
import { CreationAttributes } from "sequelize";

export const findAll = async (): Promise<User[]> => {
  return UserModel.findAll({
    attributes: { exclude: ["password"] },
  });
};

export const findById = async (id: string): Promise<User | null> => {
  return UserModel.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};

export const createUser = async (userData: CreateUserInput): Promise<User> => {
  if (!userData.password || userData.password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters long");
  }

  const user = await UserModel.create(
    userData as unknown as CreationAttributes<UserModel>,
  );
  const userObject = user.get();
  const { password: _, ...userWithoutPassword } = userObject;
  return userWithoutPassword as User;
};

export const validateCredentials = async (
  email: string,
  password: string,
): Promise<User | null> => {
  const user = await UserModel.findOne({ where: { email } });
  if (!user) return null;

  const isValid = await user.validatePassword(password);
  if (!isValid) return null;

  const userObject = user.get();
  const { password: _, ...userWithoutPassword } = userObject;
  return userWithoutPassword as User;
};

export default {
  findAll,
  findById,
  createUser,
  validateCredentials,
};
