import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { useUIStore } from "./uiStore";

describe("useUIStore", () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useUIStore.setState({
      sidebarOpen: true,
      theme: "system",
      notifications: [],
    });
  });

  describe("initial state", () => {
    it("has sidebar open by default", () => {
      const { result } = renderHook(() => useUIStore());
      expect(result.current.sidebarOpen).toBe(true);
    });

    it("has system theme by default", () => {
      const { result } = renderHook(() => useUIStore());
      expect(result.current.theme).toBe("system");
    });

    it("has no notifications by default", () => {
      const { result } = renderHook(() => useUIStore());
      expect(result.current.notifications).toEqual([]);
    });
  });

  describe("toggleSidebar", () => {
    it("toggles sidebar from open to closed", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebarOpen).toBe(false);
    });

    it("toggles sidebar from closed to open", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setSidebarOpen(false);
      });

      act(() => {
        result.current.toggleSidebar();
      });

      expect(result.current.sidebarOpen).toBe(true);
    });
  });

  describe("setSidebarOpen", () => {
    it("sets sidebar to open", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setSidebarOpen(true);
      });

      expect(result.current.sidebarOpen).toBe(true);
    });

    it("sets sidebar to closed", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setSidebarOpen(false);
      });

      expect(result.current.sidebarOpen).toBe(false);
    });
  });

  describe("setTheme", () => {
    it("sets theme to light", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setTheme("light");
      });

      expect(result.current.theme).toBe("light");
    });

    it("sets theme to dark", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setTheme("dark");
      });

      expect(result.current.theme).toBe("dark");
    });

    it("sets theme to system", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.setTheme("system");
      });

      expect(result.current.theme).toBe("system");
    });
  });

  describe("addNotification", () => {
    it("adds a notification with generated id", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: "success",
          message: "Test notification",
        });
      });

      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0]).toMatchObject({
        type: "success",
        message: "Test notification",
      });
      expect(result.current.notifications[0].id).toBeDefined();
    });

    it("adds multiple notifications", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: "info",
          message: "First notification",
        });
        result.current.addNotification({
          type: "error",
          message: "Second notification",
        });
      });

      expect(result.current.notifications).toHaveLength(2);
    });
  });

  describe("removeNotification", () => {
    it("removes a specific notification", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: "info",
          message: "Test notification",
        });
      });

      const notificationId = result.current.notifications[0].id;

      act(() => {
        result.current.removeNotification(notificationId);
      });

      expect(result.current.notifications).toHaveLength(0);
    });

    it("removes only the specified notification", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: "info",
          message: "First notification",
        });
        result.current.addNotification({
          type: "error",
          message: "Second notification",
        });
      });

      const firstId = result.current.notifications[0].id;

      act(() => {
        result.current.removeNotification(firstId);
      });

      expect(result.current.notifications).toHaveLength(1);
      expect(result.current.notifications[0].message).toBe("Second notification");
    });
  });

  describe("clearNotifications", () => {
    it("clears all notifications", () => {
      const { result } = renderHook(() => useUIStore());

      act(() => {
        result.current.addNotification({
          type: "info",
          message: "First notification",
        });
        result.current.addNotification({
          type: "error",
          message: "Second notification",
        });
      });

      act(() => {
        result.current.clearNotifications();
      });

      expect(result.current.notifications).toHaveLength(0);
    });
  });
});
