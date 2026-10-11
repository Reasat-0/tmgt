import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { generateResponse } from "../utils/generateResponse.js";

// middleware/errorHandler.ts (registered last in app.ts)
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(
      generateResponse({ message: err.message, statusCode: err.statusCode, success: false })
    );
  }

  console.error(err); // real details stay in your logs
  return res.status(500).json(
    generateResponse({ message: 'Something went wrong', statusCode: 500, success: false })
  );
};