// Class for handling API errors

import { FieldError } from './types/api.js';

export class AppError extends Error {
  statusCode: number;
  code: string;
  details: FieldError[] | undefined;
  constructor(
    statusCode: number,
    message: string,
    code: string,
    details?: FieldError[]
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
