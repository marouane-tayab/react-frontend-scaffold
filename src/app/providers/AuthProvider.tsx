import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Global auth provider placeholder.
 * Extend this with your actual auth logic (e.g. context, hooks).
 */
export function AuthProvider({ children }: AuthProviderProps) {
  return <>{children}</>;
}
