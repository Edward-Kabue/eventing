import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { DatabaseConfig } from "../types";
import { InternalError } from "../utils/errors";
import debug from "debug";

const log = debug("app:database");

dotenv.config();

const config: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "eventing",
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 3,
    match: [
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
    ],
  },
};

const sequelize = new Sequelize(config);

export async function initializeDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    log("Database connection has been established successfully.");
  } catch (error) {
    log("Unable to connect to the database:", error);
    throw new InternalError("Database connection failed");
  }
}

export async function closeDatabase(): Promise<void> {
  try {
    await sequelize.close();
    log("Database connection closed successfully.");
  } catch (error) {
    log("Error closing database connection:", error);
    throw new InternalError("Failed to close database connection");
  }
}

export default sequelize;

