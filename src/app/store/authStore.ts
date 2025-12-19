import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

/**
 * Authentication store using Zustand.
 * Persisted to localStorage and includes DevTools integration.
 */
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        // State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        setUser: (user) =>
          set({ user, isAuthenticated: !!user, error: null }, false, 'auth/setUser'),

        login: async (email, _password) => {
          set({ isLoading: true, error: null }, false, 'auth/login/start');
          try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock user data
            const user: User = {
              id: '1',
              email,
              name: email.split('@')[0],
            };

            set({ user, isAuthenticated: true, isLoading: false }, false, 'auth/login/success');
          } catch (error) {
            set(
              {
                error: error instanceof Error ? error.message : 'Login failed',
                isLoading: false,
              },
              false,
              'auth/login/error'
            );
          }
        },

        logout: () => {
          set({ user: null, isAuthenticated: false, error: null }, false, 'auth/logout');
        },

        clearError: () => set({ error: null }, false, 'auth/clearError'),
      }),
      {
        name: 'auth-storage',
        // Only persist user and isAuthenticated
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
