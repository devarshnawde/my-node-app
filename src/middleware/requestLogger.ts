import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger, { asyncLocalStorage } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const correlationId = (req.headers['x-request-id'] as string) || uuidv4();

    // Store the correlationId in AsyncLocalStorage
    const store = new Map<string, string>();
    store.set('correlationId', correlationId);

    asyncLocalStorage.run(store, () => {
        // Add correlationId to response headers for client tracing
        res.setHeader('x-request-id', correlationId);

        // Log the incoming request
        logger.info(`Incoming Request: ${req.method} ${req.url}`, {
            method: req.method,
            url: req.url,
            ip: req.ip,
            userAgent: req.get('user-agent'),
        });

        // Capture response finish to log duration/status (optional but good)
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            logger.info(`Request Completed`, {
                method: req.method,
                url: req.url,
                status: res.statusCode,
                duration: `${duration}ms`,
            });
        });

        next();
    });
};
