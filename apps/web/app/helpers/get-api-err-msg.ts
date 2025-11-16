import { AxiosError } from 'axios';
import { ApiErrorResponse } from '../types/api-response';

export function getApiErrorMessage(error: unknown): string {
  const axiosErr = error as AxiosError<ApiErrorResponse>;

  // 1. Axios response exists
  if (axiosErr.response?.data?.error?.message) {
    return axiosErr.response.data.error.message;
  }

  // 2. Fallback to axios error message
  if (axiosErr.message) {
    return axiosErr.message;
  }

  // 3. Last fallback
  return 'Something went wrong';
}
