import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS, MESSAGES } from '../config/constants.js';
import { isProduction } from '../config/environment.js';

interface ErrorResponse {
  success: false;
  message: string;
  stack?: string;
  errors?: unknown;
}

const handleCastError = (error: mongoose.Error.CastError): AppError => {
  const message = `${MESSAGES.VALIDATION.INVALID_ID}: ${error.path}`;
  return new AppError(message, HTTP_STATUS.BAD_REQUEST);
};

const handleValidationError = (error: mongoose.Error.ValidationError): AppError => {
  const errors = Object.values(error.errors).map(err => err.message);
  const message = `${MESSAGES.ERROR.VALIDATION_FAILED}: ${errors.join(', ')}`;
  return new AppError(message, HTTP_STATUS.UNPROCESSABLE_ENTITY);
};

const handleDuplicateKeyError = (error: { code: number; keyValue: Record<string, unknown> }): AppError => {
  const field = Object.keys(error.keyValue)[0];
  const message = `${field} ${MESSAGES.ERROR.ALREADY_EXISTS}`;
  return new AppError(message, HTTP_STATUS.CONFLICT);
};

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response
): void => {
  let appError: AppError;

  if (error instanceof AppError) {
    appError = error;
  } else if (error instanceof mongoose.Error.CastError) {
    appError = handleCastError(error);
  } else if (error instanceof mongoose.Error.ValidationError) {
    appError = handleValidationError(error);
  } else if ('code' in error && error.code === 11000) {
    appError = handleDuplicateKeyError(error as { code: number; keyValue: Record<string, unknown> });
  } else {
    appError = new AppError(
      MESSAGES.ERROR.INTERNAL_SERVER,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      false
    );
  }

  if (!appError.isOperational) {
    console.error('UNHANDLED ERROR:', error);
  }

  const errorResponse: ErrorResponse = {
    success: false,
    message: appError.message,
  };

  if (!isProduction) {
    errorResponse.stack = error.stack;
  }

  res.status(appError.statusCode).json(errorResponse);
};
