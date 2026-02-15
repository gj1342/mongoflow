import type { Request, Response } from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: (error?: unknown) => void
) => Promise<void | Response>;

export const asyncHandler = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: (error?: unknown) => void) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
