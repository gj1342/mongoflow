import express, { type Request, type Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { connectDatabase } from './config/database.js';
import { env } from './config/environment.js';
import { swaggerSpec } from './config/swagger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { AppError } from './utils/AppError.js';
import { HTTP_STATUS, MESSAGES, SERVER } from './config/constants.js';
import routes from './routes/index.js';

const app = express();

app.use(cors({
  origin: SERVER.CORS_ORIGIN,
}));

app.use(express.json({ limit: SERVER.REQUEST_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: SERVER.REQUEST_LIMIT }));

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     description: Check if the server is running
 *     responses:
 *       200:
 *         description: Server is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Server is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
app.get('/health', (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'MongoFlow API Documentation',
}));

app.use('/api', routes);

app.use((req: Request, res: Response, next: (error?: unknown) => void) => {
  next(new AppError(MESSAGES.ERROR.NOT_FOUND, HTTP_STATUS.NOT_FOUND));
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
      console.log(`Health check available at http://localhost:${env.port}/health`);
      console.log(`API routes available at http://localhost:${env.port}/api`);
      console.log(`API documentation available at http://localhost:${env.port}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
