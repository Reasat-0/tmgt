import { HTTPResponseStatusType } from './httpStatusCodes.js';

type generateResponseType = {
  statusCode: HTTPResponseStatusType;
  message: string;
  success: string;
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

// const sendSuccess() {

// }
