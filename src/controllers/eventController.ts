import { Request, Response } from "express";
import * as eventService from "../services/eventService";
import { Event, ApiError, CreateEventInput } from "../types";
import { AuthRequest } from "../middleware/auth";

export const create = async (
  req: AuthRequest & { body: CreateEventInput },
  res: Response<Event | ApiError>,
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const event = await eventService.createEvent(req.body, req.user!.id);
    res.status(201).json(event);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        code: "VALIDATION_ERROR",
        message: error.message,
      });
      return;
    }
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Failed to create event",
    });
  }
};

export const getAll = async (
  req: Request,
  res: Response<Event[] | ApiError>,
): Promise<void> => {
  try {
    const events = await eventService.findAll();
    res.json(events);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        code: "VALIDATION_ERROR",
        message: err.message,
      });
      return;
    }
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Failed to fetch events",
    });
  }
};

export const getById = async (
  req: Request<{ id: string }>,
  res: Response<Event | ApiError>,
): Promise<void> => {
  try {
    const event = await eventService.findById(parseInt(req.params.id));
    res.json(event);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        code: "NOT_FOUND",
        message: error.message,
      });
      return;
    }
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: "Failed to fetch event",
    });
  }
};
