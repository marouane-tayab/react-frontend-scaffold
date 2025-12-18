import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setupTests.ts",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      // TODO: Add thresholds when required
      // thresholds: {
      //   lines: 80,
      //   branches: 80,
      //   functions: 80,
      //   statements: 80,
      // },
    },
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      "e2e/**",
      "node_modules/**",
      "dist/**",
    ],
  },
});
