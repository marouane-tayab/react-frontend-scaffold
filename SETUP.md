# Setup Guide

## Quick Start

1. **Copy environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your API endpoints.

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start development server**:
   ```bash
   pnpm dev
   ```

## Available Scripts

### Development
- `pnpm dev` - Start Vite dev server on port 5173
- `pnpm build` - Production build
- `pnpm build:analyze` - Build and open bundle analyzer
- `pnpm preview` - Preview production build

### Code Quality
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check if code is formatted

### Testing
- `pnpm test` - Run unit tests once
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate coverage report
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm test:e2e:ui` - Run E2E tests with UI
- `pnpm test:e2e:headed` - Run E2E tests in headed mode
- `pnpm test:e2e:debug` - Debug E2E tests

### API Client Generation
- `pnpm generate:api:all` - Regenerate all API clients
- `pnpm generate:api:core` - Regenerate core API client
- `pnpm generate:api:analytics` - Regenerate analytics API client
- And more for other services...

## Architecture Overview

### State Management
- **Zustand** - Global application state (auth, UI)
- **React Query** - Server state management and caching
- **Local State** - Component-level state with useState

### Routing
- **React Router v7** with lazy loading for code splitting
- Routes defined in `src/app/routes.tsx`

### Error Handling
- **ErrorBoundary** - Catches React errors globally
- **API Error Handler** - Unified API error formatting

### Code Splitting
- Route-based lazy loading
- Vendor chunks (React, React Router, etc.)
- React Query and Zustand in separate chunks

## Project Guidelines

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed coding standards and best practices.

## Environment Variables

All environment variables must:
1. Start with `VITE_` prefix
2. Be defined in `.env.example`
3. Have TypeScript types in `src/vite-env.d.ts`

Example:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_DEVTOOLS=true
```

## Bundle Analysis

To analyze your bundle size:
```bash
pnpm build:analyze
```

This generates `stats.html` showing:
- Bundle composition
- Chunk sizes (gzip & brotli)
- Module treemap
