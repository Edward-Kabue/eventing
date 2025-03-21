import { Request, Response } from "express";
import { AppError } from "../utils/errors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      code: error.code,
      message: error.message,
      details: error.details,
    });
  } else {
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred",
      details:
        process.env.NODE_ENV === "development"
          ? { error: error.message }
          : undefined,
    });
  }
};
