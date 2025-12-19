import { ApiError } from '../../api/core/core/ApiError';

export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

/**
 * Formats API errors into user-friendly messages
 */
export function formatApiError(error: unknown): string {
  if (error instanceof ApiError) {
    // Handle OpenAPI generated errors
    const body = error.body as ApiErrorResponse | undefined;

    if (body?.message) {
      return body.message;
    }

    if (body?.errors) {
      // Format validation errors
      return Object.entries(body.errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('; ');
    }

    return error.message || 'An API error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Global error handler for API calls
 * Can be used with React Query's global error handler
 */
export function handleApiError(error: unknown): void {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('API Error:', error);
  }

  // TODO: Send to error logging service
  // logErrorToService(error);

  // You can also show a toast notification here
  // toast.error(message);

  return;
}

/**
 * Determines if an error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.status === 0 || error.status >= 500;
  }
  return false;
}

/**
 * Determines if an error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error instanceof ApiError) {
    return error.status === 401 || error.status === 403;
  }
  return false;
}

/**
 * Retry logic for failed requests
 */
export function shouldRetry(error: unknown, attemptNumber: number): boolean {
  // Don't retry client errors (4xx) except for specific cases
  if (error instanceof ApiError) {
    const status = error.status;

    // Retry on network errors or server errors
    if (status === 0 || status >= 500) {
      return attemptNumber < 3;
    }

    // Retry on rate limit
    if (status === 429) {
      return attemptNumber < 2;
    }
  }

  return false;
}
