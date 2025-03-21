import express, { Express, RequestHandler } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userRoutes from './routes/userRoutes';
import options from './config/swagger.config';

dotenv.config();

const app: Express = express();

// Middleware
app.use(morgan('dev') as RequestHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser() as RequestHandler);

// Swagger
const specs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/users', userRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({
    code: 'INTERNAL_ERROR',
    message: err.message
  });
});

export default app;

