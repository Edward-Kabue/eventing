import express, { Express, RequestHandler } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import healthRoutes from "./routes/healthRoutes";
import eventRoutes from "./routes/eventRoutes";
import options from "./config/swagger.config";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();

// Middleware
app.use(morgan("dev") as RequestHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Swagger
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// Error handling
app.use(errorHandler);

export default app;
