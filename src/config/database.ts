import mongoose from 'mongoose';
import { setServers } from 'node:dns/promises';
import { env } from './environment.js';
import { DATABASE, MESSAGES } from './constants.js';

let isConnected = false;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const connectDatabase = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  setServers(['1.1.1.1', '8.8.8.8']);

  let attempts = 0;
  const maxAttempts = DATABASE.MAX_RETRY_ATTEMPTS;

  while (attempts < maxAttempts) {
    try {
      await mongoose.connect(env.mongodbUri, {
        dbName: env.dbName,
        serverSelectionTimeoutMS: DATABASE.CONNECTION_TIMEOUT_MS,
      });

      isConnected = true;
      console.log(`MongoDB connected successfully to database: ${env.dbName}`);
      return;
    } catch (error) {
      attempts++;
      console.error(
        `MongoDB connection attempt ${attempts}/${maxAttempts} failed:`,
        error instanceof Error ? error.message : 'Unknown error'
      );

      if (attempts >= maxAttempts) {
        throw new Error(MESSAGES.ERROR.DATABASE_CONNECTION);
      }

      await sleep(DATABASE.RETRY_INTERVAL_MS);
    }
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
  console.log('MongoDB disconnected');
};

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected unexpectedly');
  isConnected = false;
});
