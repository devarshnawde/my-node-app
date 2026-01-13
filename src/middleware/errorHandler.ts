import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';
import { config } from '../config/env';

export const errorHandler = (
    err: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = (err as AppError).statusCode || 500;
    const status = (err as AppError).status || 'error';

    // Log the error
    if (statusCode >= 500) {
        logger.error('Unexpected Error:', {
            message: err.message,
            stack: err.stack,
            path: req.path,
            method: req.method
        });
    } else {
        logger.warn('Operational Error:', {
            message: err.message,
            statusCode,
            path: req.path,
            method: req.method
        });
    }

    // Send response
    res.status(statusCode).json({
        status,
        message: err.message,
        ...(config.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
