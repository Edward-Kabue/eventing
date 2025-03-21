import EventModel from "../models/event";
import { CreateEventInput, Event, EventStatus } from "../types";
import { validateCreateEvent } from "../validators/eventValidator";
import { NotFoundError } from "../utils/errors";
import { CreationAttributes } from "sequelize";

export const createEvent = async (
  eventData: CreateEventInput,
  creatorId: number,
): Promise<Event> => {
  validateCreateEvent(eventData);

  const event = await EventModel.create({
    title: eventData.title,
    description: eventData.description,
    date: eventData.date,
    location: eventData.location,
    capacity: eventData.capacity,
    price: eventData.price,
    creatorId,
    status: EventStatus.DRAFT,
  } as CreationAttributes<EventModel>);

  return event.get();
};

export const findAll = async (): Promise<Event[]> => {
  return EventModel.findAll();
};

export const findById = async (id: number): Promise<Event> => {
  const event = await EventModel.findByPk(id);
  if (!event) {
    throw new NotFoundError("Event not found");
  }
  return event.get();
};
