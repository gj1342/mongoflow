import { Response } from 'express';
import { HTTP_STATUS, MESSAGES } from '../config/constants.js';

interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

interface ErrorResponse {
  success: false;
  message: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = MESSAGES.SUCCESS.FETCHED,
  statusCode: number = HTTP_STATUS.OK
): Response => {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message: string = MESSAGES.SUCCESS.CREATED
): Response => {
  return sendSuccess(res, data, message, HTTP_STATUS.CREATED);
};

export const sendNoContent = (res: Response): Response => {
  return res.status(HTTP_STATUS.NO_CONTENT).send();
};

export const sendError = (
  res: Response,
  message: string = MESSAGES.ERROR.INTERNAL_SERVER,
  statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): Response => {
  const response: ErrorResponse = {
    success: false,
    message,
  };
  return res.status(statusCode).json(response);
};
