// Success Status Codes
export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_ACCEPTED = 202;
export const HTTP_NO_CONTENT = 204;

// Redirection Status Codes
export const HTTP_MOVED_PERMANENTLY = 301;
export const HTTP_FOUND = 302;
export const HTTP_NOT_MODIFIED = 304;

// Client Error Status Codes
export const HTTP_BAD_REQUEST = 400;
export const HTTP_UNAUTHORIZED = 401;
export const HTTP_FORBIDDEN = 403;
export const HTTP_NOT_FOUND = 404;
export const HTTP_CONFLICT = 409;
export const HTTP_UNPROCESSABLE_ENTITY = 422;

// Server Error Status Codes
export const HTTP_INTERNAL_SERVER_ERROR = 500;
export const HTTP_NOT_IMPLEMENTED = 501;
export const HTTP_BAD_GATEWAY = 502;
export const HTTP_SERVICE_UNAVAILABLE = 503;
export const HTTP_GATEWAY_TIMEOUT = 504;

export type HTTPResponseStatusType =
  | typeof HTTP_OK
  | typeof HTTP_CREATED
  | typeof HTTP_ACCEPTED
  | typeof HTTP_NO_CONTENT
  | typeof HTTP_MOVED_PERMANENTLY
  | typeof HTTP_FOUND
  | typeof HTTP_NOT_MODIFIED
  | typeof HTTP_BAD_REQUEST
  | typeof HTTP_UNAUTHORIZED
  | typeof HTTP_FORBIDDEN
  | typeof HTTP_NOT_FOUND
  | typeof HTTP_CONFLICT
  | typeof HTTP_UNPROCESSABLE_ENTITY
  | typeof HTTP_INTERNAL_SERVER_ERROR
  | typeof HTTP_NOT_IMPLEMENTED
  | typeof HTTP_BAD_GATEWAY
  | typeof HTTP_SERVICE_UNAVAILABLE
  | typeof HTTP_GATEWAY_TIMEOUT;
