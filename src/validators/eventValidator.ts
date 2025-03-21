import { CreateEventInput } from "../types";
import { ValidationError } from "../utils/errors";

export const validateCreateEvent = (data: Partial<CreateEventInput>): void => {
  if (!data.title?.trim()) {
    throw new ValidationError("Title is required");
  }
  if (!data.description?.trim()) {
    throw new ValidationError("Description is required");
  }
  if (!data.date) {
    throw new ValidationError("Date is required");
  }
  if (new Date(data.date) < new Date()) {
    throw new ValidationError("Event date must be in the future");
  }
  if (!data.location?.trim()) {
    throw new ValidationError("Location is required");
  }
  if (!data.capacity || data.capacity < 1) {
    throw new ValidationError("Capacity must be at least 1");
  }
  if (data.price === undefined || data.price === null || data.price < 0) {
    throw new ValidationError("Price cannot be negative");
  }
};
