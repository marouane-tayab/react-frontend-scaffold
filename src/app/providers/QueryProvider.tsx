import { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Global data-fetching / query provider placeholder.
 * Wrap this with React Query or your preferred data layer later.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return <>{children}</>;
}
