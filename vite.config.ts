import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html in root
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: "stats.html",
    }),
  ],
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunk
          vendor: ["react", "react-dom", "react-router-dom"],
          // Split React Query into separate chunk
          query: ["@tanstack/react-query"],
          // Split Zustand into separate chunk
          store: ["zustand"],
        },
      },
    },
    // Increase chunk size warning limit (default is 500kb)
    chunkSizeWarningLimit: 1000,
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
