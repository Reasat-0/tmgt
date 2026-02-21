import { Request, Response, NextFunction } from 'express';
import {
  HTTP_BAD_GATEWAY,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
} from '../utils/httpStatusCodes.js';
import { generateResponse } from '../utils/response.js';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Get the token from reqest authorization header.
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HTTP_UNAUTHORIZED).json(
      generateResponse({
        message: 'No token provided',
        statusCode: HTTP_UNAUTHORIZED,
        success: false,
      })
    );
  }
};
