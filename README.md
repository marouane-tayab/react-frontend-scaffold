## Insight Frontend

React + TypeScript app bootstrapped in a Vite-style layout, configured for **pnpm**, with:

- **Unit testing**: Vitest + React Testing Library
- **E2E testing**: Playwright
- **API client generation**: `openapi-typescript-codegen` via a simple CLI script

### Prerequisites

- **Node.js** 18+ (recommended)
- **pnpm** installed globally (`npm install -g pnpm`)

### Install dependencies

```bash
pnpm install
```

### Run the dev server

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Run unit tests (Vitest + RTL)

```bash
pnpm test           # single run (no coverage)
pnpm test:watch     # watch mode
pnpm test:coverage  # coverage report + 80% coverage threshold
```

Unit tests are configured with:

- **Vitest** as the test runner
- `jsdom` test environment
- React Testing Library and `@testing-library/jest-dom` in `src/tests/setupTests.ts`
- Coverage reporting via `@vitest/coverage-v8` with a global 80% threshold (lines/branches/functions/statements)

### Run E2E tests (Playwright)

First, install browser binaries:

```bash
pnpm playwright:install
```

Then run tests:

```bash
pnpm test:e2e         # headless
pnpm test:e2e:ui      # Playwright UI mode
pnpm test:e2e:headed  # headed mode
pnpm test:e2e:debug   # debug mode
```

The Playwright config (`playwright.config.ts`) starts the Vite dev server via `pnpm dev` and points tests at `http://localhost:5173`.

### Generate API client from OpenAPI

Place your OpenAPI JSON spec at the project root as `openapi.json` (or update the script path), then run:

```bash
pnpm generate:api
```

This uses `openapi-typescript-codegen` and will generate a fully typed client into `src/api` (using the Fetch client, union types, and options arguments).
