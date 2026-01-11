import winston from 'winston';
import { AsyncLocalStorage } from 'async_hooks';

// AsyncLocalStorage to store context (correlationId) across the async call chain
export const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>();

// Custom format to inject correlationId if available
const injectCorrelationId = winston.format((info) => {
    const store = asyncLocalStorage.getStore();
    const correlationId = store?.get('correlationId');
    if (correlationId) {
        info.correlationId = correlationId;
    }
    return info;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        injectCorrelationId(),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                injectCorrelationId(),
                winston.format.timestamp(),
                // In production, use JSON. In dev, maybe pretty print, but JSON is safer for consistency.
                // We'll stick to JSON for "production-grade" feel, but add colorize for local dev if needed.
                process.env.NODE_ENV === 'development'
                    ? winston.format.combine(winston.format.colorize(), winston.format.simple())
                    : winston.format.json()
            ),
        }),
    ],
});

export default logger;
