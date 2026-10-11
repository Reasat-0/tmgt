import { HTTPResponseStatusType } from './httpStatusCodes.js';
import {
  ApiError,
  ApiSuccess,
  FieldError,
  PaginationMeta,
} from './types/api.js';

interface Response {
  success: boolean;
  message: string;
  data?: unknown;
  meta?: unknown;
}

type generateResponseType = {
  statusCode: HTTPResponseStatusType;
  message: string;
  success: string | boolean;
  data?: unknown;
};
export const generateResponse = (params: generateResponseType) => {
  const { message, statusCode, success, data } = params;
  return {
    data,
    message,
    status: statusCode,
    success,
  };
};

export const successResponse = <T>(
  message: string,
  data?: T,
  meta?: PaginationMeta
): ApiSuccess<T> => ({
  success: true,
  message,
  data,
  meta,
});

export const errorResponse = (
  message: string,
  code: string,
  details?: FieldError[]
): ApiError => ({
  success: false,
  message,
  error: { code, details },
});
