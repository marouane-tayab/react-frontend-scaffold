import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FEATURE_FLAGS } from "../config";
import { queryClient } from "./queryClient";

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Global data-fetching provider using React Query.
 * Provides caching, synchronization, and more for remote data.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {FEATURE_FLAGS.enableDevtools && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}
