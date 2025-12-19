import { QueryClient } from '@tanstack/react-query';

// Configure React Query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache queries for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests 1 time
      retry: 1,
      // Don't refetch on window focus in development
      refetchOnWindowFocus: import.meta.env.PROD,
      // Global error handler
      throwOnError: false,
    },
    mutations: {
      // Global mutation error handler
      throwOnError: false,
      // Retry failed mutations once
      retry: 1,
    },
  },
});
