import { describe, expect, it } from 'vitest';
import { ApiError } from '../../api/core/core/ApiError';
import { formatApiError, isNetworkError, isAuthError, shouldRetry } from './apiErrorHandler';

describe('apiErrorHandler', () => {
  describe('formatApiError', () => {
    it('formats ApiError with message', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 400,
          statusText: 'Bad Request',
          body: {
            message: 'Invalid request',
          },
        },
        'Invalid request'
      );

      expect(formatApiError(error)).toBe('Invalid request');
    });

    it('formats ApiError with validation errors', () => {
      const error = new ApiError(
        {
          method: 'POST',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 422,
          statusText: 'Unprocessable Entity',
          body: {
            errors: {
              email: ['Email is required'],
              password: ['Password must be at least 8 characters'],
            },
          },
        },
        'Validation failed'
      );

      const result = formatApiError(error);
      expect(result).toContain('email: Email is required');
      expect(result).toContain('password: Password must be at least 8 characters');
    });

    it('formats generic Error', () => {
      const error = new Error('Something went wrong');
      expect(formatApiError(error)).toBe('Something went wrong');
    });

    it('formats unknown error', () => {
      const error = 'string error';
      expect(formatApiError(error)).toBe('An unexpected error occurred');
    });

    it('handles ApiError without body', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          body: undefined,
        },
        'Server error'
      );

      expect(formatApiError(error)).toBe('Server error');
    });
  });

  describe('isNetworkError', () => {
    it('returns true for status 0 (network error)', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 0,
          statusText: 'Network Error',
          body: null,
        },
        'Network error'
      );

      expect(isNetworkError(error)).toBe(true);
    });

    it('returns true for 5xx errors', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          body: null,
        },
        'Server error'
      );

      expect(isNetworkError(error)).toBe(true);
    });

    it('returns false for 4xx errors', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 404,
          statusText: 'Not Found',
          body: null,
        },
        'Not found'
      );

      expect(isNetworkError(error)).toBe(false);
    });

    it('returns false for non-ApiError', () => {
      const error = new Error('Generic error');
      expect(isNetworkError(error)).toBe(false);
    });
  });

  describe('isAuthError', () => {
    it('returns true for 401 Unauthorized', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
          body: null,
        },
        'Unauthorized'
      );

      expect(isAuthError(error)).toBe(true);
    });

    it('returns true for 403 Forbidden', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 403,
          statusText: 'Forbidden',
          body: null,
        },
        'Forbidden'
      );

      expect(isAuthError(error)).toBe(true);
    });

    it('returns false for other status codes', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 404,
          statusText: 'Not Found',
          body: null,
        },
        'Not found'
      );

      expect(isAuthError(error)).toBe(false);
    });

    it('returns false for non-ApiError', () => {
      const error = new Error('Generic error');
      expect(isAuthError(error)).toBe(false);
    });
  });

  describe('shouldRetry', () => {
    it('retries network errors up to 3 attempts', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 0,
          statusText: 'Network Error',
          body: null,
        },
        'Network error'
      );

      expect(shouldRetry(error, 1)).toBe(true);
      expect(shouldRetry(error, 2)).toBe(true);
      expect(shouldRetry(error, 3)).toBe(false);
    });

    it('retries 5xx errors up to 3 attempts', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          body: null,
        },
        'Server error'
      );

      expect(shouldRetry(error, 1)).toBe(true);
      expect(shouldRetry(error, 2)).toBe(true);
      expect(shouldRetry(error, 3)).toBe(false);
    });

    it('retries 429 rate limit up to 2 attempts', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 429,
          statusText: 'Too Many Requests',
          body: null,
        },
        'Rate limited'
      );

      expect(shouldRetry(error, 1)).toBe(true);
      expect(shouldRetry(error, 2)).toBe(false);
    });

    it('does not retry 4xx client errors', () => {
      const error = new ApiError(
        {
          method: 'GET',
          url: '/test',
        },
        {
          url: '/test',
          ok: false,
          status: 400,
          statusText: 'Bad Request',
          body: null,
        },
        'Bad request'
      );

      expect(shouldRetry(error, 1)).toBe(false);
    });

    it('does not retry non-ApiError', () => {
      const error = new Error('Generic error');
      expect(shouldRetry(error, 1)).toBe(false);
    });
  });
});
