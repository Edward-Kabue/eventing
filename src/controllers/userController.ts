import { Request, Response } from "express";
import * as userService from "../services/userService";
import { User, ApiError, CreateUserInput } from "../types";
import { ValidationError } from "../utils/errors";

export const getAll = async (
  req: Request,
  res: Response<User[] | ApiError>,
): Promise<void> => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (err) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Failed to fetch users",
      details: { error: error.message },
    });
  }
};

export const getById = async (
  req: Request<{ id: string }>,
  res: Response<User | ApiError>,
): Promise<void> => {
  try {
    const user = await userService.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Failed to fetch user",
      details: { error: errorMessage },
    });
  }
};

export const create = async (
  req: Request<unknown, unknown, CreateUserInput>,
  res: Response<User | ApiError>,
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        code: "VALIDATION_ERROR",
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Failed to create user",
      details: {
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
};

export default {
  getAll,
  getById,
  create,
};
