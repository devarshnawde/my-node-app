import express from 'express';
import { requestLogger } from './middleware/requestLogger';
import logger from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.get('/', (req, res) => {
    logger.info('Handling root request', { customData: 'some business logic' });
    res.json({ message: 'Hello World' });
});

app.get('/error', (req, res) => {
    logger.error('Something went wrong', { error: 'Simulation' });
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

export default app;
