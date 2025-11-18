export interface ApiSuccessResponse<T> {
  success: true;
  status: string;
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
  data: T;
}
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    statusCode: number;
    message: string;
    details?: unknown;
  };
  meta: {
    timestamp: string;
    version: string;
  };
}

// This is the union of both success + error
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
