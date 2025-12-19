# GitHub Copilot Instructions for Insight Frontend

## Overview

This document defines the coding standards, architectural patterns, and best practices for the Insight Frontend repository. All contributors and AI assistants should follow these guidelines to maintain consistency and code quality.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Package Manager**: pnpm
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Styling**: CSS (module or styled-components can be added)
- **Testing**: Vitest + React Testing Library (unit), Playwright (E2E)
- **Code Quality**: ESLint + Prettier
- **API Client**: OpenAPI TypeScript Codegen

## Project Structure

```
src/
├── api/                    # Auto-generated API clients (DO NOT EDIT)
│   ├── core/
│   ├── analytics/
│   ├── meeting-intelligence/
│   ├── storage-media/
│   ├── user-tenant/
│   └── integrations-notifications/
├── app/                    # Application core
│   ├── config.ts          # Environment configuration
│   ├── routes.tsx         # Router configuration
│   ├── pages/             # Route page components
│   ├── providers/         # Context providers
│   └── store/             # Zustand stores
├── features/              # Feature modules (domain-driven)
│   ├── admin/
│   ├── analytics/
│   ├── billing/
│   ├── settings/
│   └── users/
├── shared/                # Shared utilities
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── types/            # Shared TypeScript types
│   └── ui/               # Design system components
└── tests/                # Test setup and mocks
```

## Coding Standards

### TypeScript

1. **Always use TypeScript** - No plain JavaScript files
2. **Use strict mode** - Already configured in tsconfig.json
3. **Avoid `any`** - Use `unknown` and type guards instead
4. **Define interfaces for props**:
   ```typescript
   interface ButtonProps {
     label: string;
     onClick: () => void;
     disabled?: boolean;
   }
   ```
5. **Export types alongside components**

### React Components

1. **Use functional components** - No class components except ErrorBoundary
2. **Use named exports** for components:
   ```typescript
   export function MyComponent() { ... }
   ```
3. **Co-locate related files** in feature folders
4. **Props interface naming**: `ComponentNameProps`
5. **Use React.FC sparingly** - Prefer explicit typing
6. **Organize component structure**:
   ```typescript
   // Imports
   import { useState } from "react";
   
   // Types
   interface MyComponentProps {
     title: string;
   }
   
   // Component
   export function MyComponent({ title }: MyComponentProps) {
     // Hooks
     const [count, setCount] = useState(0);
     
     // Handlers
     const handleClick = () => setCount(c => c + 1);
     
     // Render
     return <div onClick={handleClick}>{title}: {count}</div>;
   }
   ```

### State Management

1. **Use Zustand for global state**:
   - Create domain-specific stores in `src/app/store/`
   - Use `devtools` middleware for debugging
   - Use `persist` middleware for localStorage persistence when needed
   
   ```typescript
   export const useMyStore = create<MyStore>()(
     devtools(
       persist(
         (set) => ({
           // state and actions
         }),
         { name: "my-store" }
       ),
       { name: "MyStore" }
     )
   );
   ```

2. **Use React Query for server state**:
   - All API calls should use React Query hooks
   - Define query keys as constants
   - Use mutations for data changes
   
   ```typescript
   const { data, isLoading } = useQuery({
     queryKey: ["insights", id],
     queryFn: () => InsightsService.getInsight({ id }),
   });
   ```

3. **Use local state for UI-only state**:
   - Form inputs, modals, dropdowns

### Data Fetching

1. **Use generated API clients** from `src/api/`
2. **Configure API base URLs** in environment variables
3. **Wrap API calls with React Query**:
   ```typescript
   // In a custom hook
   export function useInsights() {
     return useQuery({
       queryKey: ["insights"],
       queryFn: () => InsightsService.listInsights({}),
     });
   }
   ```
4. **Handle errors gracefully** using error handlers in `shared/lib/apiErrorHandler.ts`

### Routing

1. **Use React Router v7** with data APIs
2. **Define routes in** `src/app/routes.tsx`
3. **Use lazy loading** for route-level code splitting:
   ```typescript
   const DashboardPage = lazy(() => 
     import("./pages/DashboardPage").then(m => ({ default: m.DashboardPage }))
   );
   ```
4. **Feature-specific routes** should be exported from feature folders

### Error Handling

1. **Use ErrorBoundary** at the app root (already configured)
2. **Handle API errors** with React Query error callbacks
3. **Display user-friendly messages** using the error formatter
4. **Log errors** to console in development, send to service in production

### Testing

**CRITICAL**: All new code MUST include comprehensive unit tests. See [TESTING.md](../TESTING.md) for full guidelines.

1. **Write tests alongside components**: `ComponentName.test.tsx`
2. **Required test coverage**:
   - Every React component must test rendering, interactions, and edge cases
   - Every custom hook must test state updates and side effects
   - Every Zustand store must test initial state and all actions
   - Every utility function must test happy path and error cases
3. **Test user interactions**, not implementation details
4. **Use Testing Library queries** in priority order:
   - getByRole (preferred for accessibility)
   - getByLabelText
   - getByPlaceholderText
   - getByText
   - getByTestId (last resort)
5. **Mock API calls** in tests using vi.mock() or MSW
6. **E2E tests** for critical user flows with Playwright
7. **Run tests before committing**:
   ```bash
   pnpm test           # Run all tests
   pnpm test:watch     # Watch mode
   pnpm test:coverage  # With coverage report
   ```

**Example Test Pattern**:
```typescript
describe("MyComponent", () => {
  it("renders with required props", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles user interaction", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<MyComponent onClick={handleClick} />);
    await user.click(screen.getByRole("button"));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Styling

1. **Use semantic HTML** first
2. **Prefer CSS modules** or styled-components (to be added)
3. **Mobile-first** responsive design
4. **Use CSS custom properties** for theming
5. **Follow accessibility** standards (WCAG 2.1 AA)

### Environment Configuration

1. **Never commit `.env` files**
2. **Use `VITE_` prefix** for client-side variables
3. **Access via** `import.meta.env.VITE_*`
4. **Define types** in `src/vite-env.d.ts`
5. **Update `.env.example`** when adding new variables

### API Client Generation

1. **DO NOT manually edit** files in `src/api/**/core`, `src/api/**/models`, or `src/api/**/services`
2. **Regenerate clients** when OpenAPI specs change:
   ```bash
   pnpm generate:api:all
   ```
3. **Configure API base URLs** in `src/app/config.ts`

### Code Quality

1. **Run linter before commits**:
   ```bash
   pnpm lint:fix
   ```
2. **Format code with Prettier**:
   ```bash
   pnpm format
   ```
3. **Keep files under 300 lines** - Extract into smaller modules
4. **Use meaningful variable names** - No single letters except in loops/math
5. **Comment complex logic** - Code should be self-documenting otherwise

### Performance

1. **Use lazy loading** for routes
2. **Memoize expensive calculations** with `useMemo`
3. **Memoize callbacks** passed to child components with `useCallback`
4. **Virtualize long lists** (react-virtual or similar)
5. **Monitor bundle size** with `pnpm build:analyze`
6. **Code split by route** and feature

### Accessibility

1. **Use semantic HTML elements**
2. **Add ARIA labels** when needed
3. **Ensure keyboard navigation** works
4. **Test with screen readers**
5. **Maintain color contrast** ratios
6. **Support prefers-reduced-motion**

### Security

1. **Sanitize user inputs**
2. **Use HTTPS** in production
3. **Don't expose secrets** in client code
4. **Validate data** on both client and server
5. **Use Content Security Policy**

### Git Workflow

1. **Use descriptive commit messages**:
   - `feat: add user authentication`
   - `fix: resolve login redirect issue`
   - `docs: update README with setup instructions`
   - `refactor: extract API error handling`
2. **Keep commits atomic** - One logical change per commit
3. **Create feature branches** from `main`
4. **Squash commits** before merging

### Feature Development Pattern

When creating a new feature:

1. **Create feature folder** in `src/features/feature-name/`
2. **Structure**:
   ```
   features/feature-name/
   ├── index.ts              # Public API
   ├── components/           # Feature-specific components
   ├── hooks/               # Feature-specific hooks
   ├── api/                 # React Query hooks for this feature
   ├── store/               # Feature-specific Zustand store (if needed)
   ├── types.ts             # Feature-specific types
   └── routes.tsx           # Feature routes
   ```
3. **Export only what's needed** via index.ts
4. **Keep features independent** - Minimize cross-feature imports

### Custom Hooks Pattern

1. **Prefix with `use`**
2. **Single responsibility**
3. **Return objects for multiple values**:
   ```typescript
   export function useAuth() {
     return {
       user,
       isAuthenticated,
       login,
       logout,
     };
   }
   ```

### Common Patterns

#### Loading States
```typescript
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <DataDisplay data={data} />;
```

#### Form Handling
```typescript
const [formData, setFormData] = useState(initialState);

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  await mutation.mutateAsync(formData);
};
```

#### API Integration
```typescript
// Define hook in features/my-feature/api/useMyFeature.ts
export function useMyFeature(id: string) {
  return useQuery({
    queryKey: ["my-feature", id],
    queryFn: () => MyService.get({ id }),
    enabled: !!id,
  });
}
```

## Package Management

1. **Use pnpm** exclusively
2. **Install dependencies**:
   ```bash
   pnpm add package-name
   pnpm add -D dev-package-name
   ```
3. **Keep dependencies updated** regularly
4. **Document reasons** for adding new packages

## Build & Deployment

1. **Test locally** before pushing:
   ```bash
   pnpm lint && pnpm test && pnpm build
   ```
2. **Preview production build**:
   ```bash
   pnpm preview
   ```
3. **Check bundle size** regularly
4. **Configure CI/CD** in `azure-pipeline.yml`

## Documentation

1. **Update README** when adding major features
2. **Document complex algorithms** with comments
3. **Add JSDoc** for public APIs
4. **Keep this file updated** with new patterns

## Questions & Support

When unsure about a pattern:
1. Check existing code for similar examples
2. Follow React and TypeScript best practices
3. Prioritize readability and maintainability
4. Ask team members for guidance

---

**Last Updated**: December 19, 2025
**Maintained By**: Development Team
