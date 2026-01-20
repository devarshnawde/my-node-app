import express from 'express';
import { requestLogger } from './middleware/requestLogger';
import { config } from './config/env';
import logger from './utils/logger';
import { AppError } from './utils/AppError';
import { errorHandler } from './middleware/errorHandler';
import { healthRoutes } from './routes/health.routes';

const app = express();
const PORT = config.PORT;

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/', healthRoutes);

app.get('/', (req, res) => {
    logger.info('Handling root request', { customData: 'some business logic' });
    res.json({ message: 'Hello World' });
});



// 404 Handler
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

export default app;
