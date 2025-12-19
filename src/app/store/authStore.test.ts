import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { useAuthStore } from "./authStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  describe("initial state", () => {
    it("has no user by default", () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.user).toBeNull();
    });

    it("is not authenticated by default", () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("is not loading by default", () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.isLoading).toBe(false);
    });

    it("has no error by default", () => {
      const { result } = renderHook(() => useAuthStore());
      expect(result.current.error).toBeNull();
    });
  });

  describe("setUser", () => {
    it("sets user and authentication status", () => {
      const { result } = renderHook(() => useAuthStore());
      const mockUser = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      };

      act(() => {
        result.current.setUser(mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it("clears user when set to null", () => {
      const { result } = renderHook(() => useAuthStore());
      const mockUser = {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      };

      act(() => {
        result.current.setUser(mockUser);
      });

      act(() => {
        result.current.setUser(null);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("login", () => {
    it("sets user after successful login", async () => {
      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login("test@example.com", "password");
      });

      expect(result.current.user).toEqual({
        id: "1",
        email: "test@example.com",
        name: "test",
      });
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe("logout", () => {
    it("clears user and authentication state", async () => {
      const { result } = renderHook(() => useAuthStore());

      // First login
      await act(async () => {
        await result.current.login("test@example.com", "password");
      });

      // Then logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe("clearError", () => {
    it("clears error state", () => {
      const { result } = renderHook(() => useAuthStore());

      // Manually set error for testing
      act(() => {
        useAuthStore.setState({ error: "Test error" });
      });

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });
});
