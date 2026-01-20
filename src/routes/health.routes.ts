import { Router, Request, Response } from 'express';
import logger from '../utils/logger';

const router = Router();

// Liveness Probe: Is the process running?
router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// Readiness Probe: Is the app ready to serve traffic? (e.g. DB connected)
router.get('/ready', (req: Request, res: Response) => {
    // TODO: Check DB connection here when we add Mongoose
    res.status(200).json({
        status: 'READY',
        timestamp: new Date().toISOString(),
    });
});

export const healthRoutes = router;
