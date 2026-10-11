// Pagination metadata structure for API responses
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
// Success response structure for API
export interface ApiSuccess<T = unknown> {
  success: true;
  message: string;
  data?: T | undefined;
  meta?: PaginationMeta | undefined;
}

// Error response structure for API
export interface FieldError {
  field: string;
  message: string;
}
// Error response structure for API

export interface ApiError {
  success: false;
  message: string;
  error: {
    code: string;
    details?: FieldError[] | undefined;
  };
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;
