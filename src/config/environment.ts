import dotenv from 'dotenv';
import { SERVER } from './constants.js';

dotenv.config();

interface Environment {
  nodeEnv: string;
  port: number;
  mongodbUri: string;
  dbName: string;
}

const getEnvironmentVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
};

const validateEnvironment = (): Environment => {
  const nodeEnv = getEnvironmentVariable('NODE_ENV', 'development');
  const port = parseInt(getEnvironmentVariable('PORT', SERVER.DEFAULT_PORT.toString()), 10);
  const mongodbUri = getEnvironmentVariable('MONGODB_URI');
  const dbName = getEnvironmentVariable('DB_NAME');

  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid number between 1 and 65535');
  }

  return {
    nodeEnv,
    port,
    mongodbUri,
    dbName,
  };
};

export const env = validateEnvironment();

export const isDevelopment = env.nodeEnv === 'development';
export const isProduction = env.nodeEnv === 'production';
export const isTest = env.nodeEnv === 'test';
