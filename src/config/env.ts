import dotenv from 'dotenv';
import { cleanEnv, str, port, num } from 'envalid';

// Load .env file (if exists)
dotenv.config();

export const config = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
    PORT: port({ default: 3000 }),
    LOG_LEVEL: str({ choices: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'], default: 'info' }),
});
