import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
  }>;
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: UIState['theme']) => void;
  addNotification: (notification: Omit<UIState['notifications'][number], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

type UIStore = UIState & UIActions;

/**
 * UI state store using Zustand.
 * Manages global UI state like sidebar, theme, and notifications.
 */
export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      // State
      sidebarOpen: true,
      theme: 'system',
      notifications: [],

      // Actions
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'ui/toggleSidebar'),

      setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'ui/setSidebarOpen'),

      setTheme: (theme) => set({ theme }, false, 'ui/setTheme'),

      addNotification: (notification) =>
        set(
          (state) => ({
            notifications: [...state.notifications, { ...notification, id: crypto.randomUUID() }],
          }),
          false,
          'ui/addNotification'
        ),

      removeNotification: (id) =>
        set(
          (state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }),
          false,
          'ui/removeNotification'
        ),

      clearNotifications: () => set({ notifications: [] }, false, 'ui/clearNotifications'),
    }),
    { name: 'UIStore' }
  )
);
