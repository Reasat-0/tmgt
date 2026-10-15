import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { errorResponse, generateResponse } from "../utils/generateResponse.js";

// middleware/errorHandler.ts (registered last in app.ts)
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // if the headers have already been sent, delegate to the default Express error handler
  if(res.headersSent){
    return next(err)
  }

    // Expected error: we threw it on purpose, so it's safe to send
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json(errorResponse(err.message, err.code, err.details));
  }

  // Unexpected error: log the real details, send a generic message
  console.error(err);
  return res
    .status(500)
    .json(errorResponse('Something went wrong', 'INTERNAL_ERROR'));
};