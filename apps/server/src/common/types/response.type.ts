/**
 * Base response for all API requests
 *
 * @property {boolean} success - Indicates whether the request was successful or not
 * @property {object} meta - Metadata about the response
 * @property {string} meta.timestamp - Timestamp of the response
 * @property {string} meta.version - API version
 * @property {string} [meta.requestId] - Optional request ID for tracking
 */
export interface BaseResponse {
  success: boolean;
  /** Metadata about the response */
  meta: {
    /** Timestamp of the response */
    timestamp: string;
    /** API version */
    version: string;
    /** Optional request ID for tracking */
    requestId?: string;
  };
}

/**
 * Successful response
 *
 * @property {boolean} success - Indicates whether the request was successful or not
 * @property {T} data - The data returned by the API
 * @property {string} [msg] - An optional message returned by the API
 */
export interface SuccessResponse<T> extends BaseResponse {
  success: true;
  data: T;
  msg?: string;
}

/**
 * Error response
 *
 * @property {boolean} success - Indicates whether the request was successful or not
 * @property {object} error - Contains information about the error
 * @property {string} error.code - The error code
 * @property {string} error.message - The error message
 * @property {unknown} error.details - Additional information about the error (optional)
 */

export interface ErrorResponse extends BaseResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Pagination information
 *
 * @property {number} page - The current page number
 * @property {number} limit - The limit of items per page
 * @property {number} total - The total number of items
 * @property {number} totalPages - The total number of pages
 * @property {boolean} hasPrevPage - Whether there is a previous page
 * @property {boolean} hasNextPage - Whether there is a next page
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

/**
 * Paginated response
 *
 * @property {T[]} data - The data returned by the API, paginated
 * @property {PaginationInfo} pagination - Information about the pagination
 */
export interface PaginatedSuccessResponse<T = unknown>
  extends SuccessResponse<T[]> {
  /** Pagination information */
  pagination: PaginationInfo;
}

/**
 * Raw response wrapper to bypass the response interceptor
 */
export interface RawResponse<T = unknown> {
  _raw: true;
  data: T;
}

export function creareRawResponse<T = unknown>(data: T): RawResponse<T> {
  return {
    _raw: true,
    data,
  };
}

export function isRawResponse(data: RawResponse): data is RawResponse {
  return data && typeof data == 'object' && data._raw === true;
}

/**
 * ============================================================================
 * API RESPONSE DECORATOR TYPES
 * ============================================================================
 */

/**
 * Options for API response configuration
 */
export interface ApiResponseOptions {
  /** Custom status code for the response */
  statusCode?: number;

  /** Additional metadata to include in the response */
  metadata?: Record<string, any>;

  /** Custom headers to set on the response */
  headers?: Record<string, string>;

  /** Whether to include request ID in the response */
  includeRequestId?: boolean;

  /** Custom response transformation function */
  transform?: (data: any) => any;
}

/**
 * Metadata stored by API response decorators
 */
export interface ApiSuccessMetadata {
  message?: string;
  options?: ApiResponseOptions;
}

export interface ApiCustomMetadata {
  statusCode: number;
  message?: string;
  options?: ApiResponseOptions;
}

export interface ApiErrorMetadata {
  message?: string;
  statusCode: number;
}

/**
 * Union type for all API response metadata
 */
export type ApiResponseMetadata =
  | { type: 'success'; data: ApiSuccessMetadata }
  | { type: 'custom'; data: ApiCustomMetadata }
  | { type: 'error'; data: ApiErrorMetadata }
  | { type: 'raw'; data: boolean };
