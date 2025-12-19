# Unit Testing Guide for Insight Frontend

## Overview

This guide establishes testing standards and patterns for the Insight Frontend project. All new components, hooks, utilities, and stores **MUST** include comprehensive unit tests.

## Testing Stack

- **Test Runner**: Vitest
- **Testing Library**: React Testing Library
- **Assertion Library**: Vitest (Jest-compatible)
- **Coverage Tool**: V8

## Test File Location & Naming

### Rule: Co-locate tests with source files

Place test files in the **same directory** as the code being tested:

```
src/
├── app/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── HomePage.test.tsx          ✅ Test file next to component
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── authStore.test.ts          ✅ Test file next to store
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   ├── QueryProvider.test.tsx     ✅ Test file next to provider
├── shared/
│   ├── lib/
│   │   ├── apiErrorHandler.ts
│   │   ├── apiErrorHandler.test.ts    ✅ Test file next to utility
```

### Naming Convention

- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.ts`
- Utility tests: `utilityName.test.ts`
- Store tests: `storeName.test.ts`

## Required Test Coverage

### 1. React Components

**Every component MUST test:**

✅ **Rendering**
- Component renders without crashing
- Key elements are present
- Props are rendered correctly

✅ **User Interactions**
- Click handlers fire correctly
- Form inputs work
- Keyboard navigation works

✅ **Conditional Rendering**
- Loading states
- Error states
- Empty states
- Different prop combinations

✅ **Accessibility**
- ARIA attributes
- Role attributes
- Semantic HTML

#### Example: Component Test Pattern

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MyButton } from "./MyButton";

describe("MyButton", () => {
  it("renders with label", () => {
    render(<MyButton label="Click Me" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<MyButton label="Click" onClick={handleClick} />);
    await user.click(screen.getByRole("button"));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<MyButton label="Click" onClick={() => {}} disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### 2. Custom Hooks

**Every custom hook MUST test:**

✅ **Initial State**
- Default values are correct

✅ **State Updates**
- Actions modify state correctly

✅ **Side Effects**
- API calls trigger correctly
- Cleanup happens

✅ **Edge Cases**
- Error scenarios
- Race conditions

#### Example: Hook Test Pattern

```typescript
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("has initial count of 0", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("increments count", () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it("accepts initial value", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
});
```

### 3. Zustand Stores

**Every store MUST test:**

✅ **Initial State**
- All state properties have correct defaults

✅ **Actions**
- Each action modifies state correctly
- Actions maintain immutability

✅ **Derived State**
- Selectors return correct values

✅ **Persistence**
- If using `persist`, verify localStorage behavior

#### Example: Store Test Pattern

```typescript
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { useMyStore } from "./myStore";

describe("useMyStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useMyStore.setState({ /* reset to defaults */ });
  });

  it("has correct initial state", () => {
    const { result } = renderHook(() => useMyStore());
    expect(result.current.items).toEqual([]);
  });

  it("adds item", () => {
    const { result } = renderHook(() => useMyStore());
    
    act(() => {
      result.current.addItem({ id: "1", name: "Test" });
    });
    
    expect(result.current.items).toHaveLength(1);
  });
});
```

### 4. Utility Functions

**Every utility MUST test:**

✅ **Happy Path**
- Function works with valid inputs

✅ **Edge Cases**
- Empty inputs
- Null/undefined
- Boundary values

✅ **Error Handling**
- Invalid inputs throw or return error
- Error messages are correct

#### Example: Utility Test Pattern

```typescript
import { describe, expect, it } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats positive numbers", () => {
    expect(formatCurrency(1000)).toBe("$1,000.00");
  });

  it("formats negative numbers", () => {
    expect(formatCurrency(-500)).toBe("-$500.00");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("rounds to 2 decimal places", () => {
    expect(formatCurrency(10.999)).toBe("$11.00");
  });
});
```

### 5. API Integration (with React Query)

**Every React Query hook MUST test:**

✅ **Loading State**
- Shows loading initially

✅ **Success State**
- Data renders correctly

✅ **Error State**
- Error message displays

✅ **Refetch**
- Can retry failed requests

#### Example: React Query Test Pattern

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { useInsights } from "./useInsights";
import * as InsightsService from "../../api/core/services/InsightsService";

// Create wrapper
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useInsights", () => {
  it("fetches insights successfully", async () => {
    vi.spyOn(InsightsService.InsightsService, "listInsights").mockResolvedValue({
      items: [{ id: "1", title: "Test" }],
      page: 1,
      pageSize: 20,
      totalItems: 1,
      totalPages: 1,
    });

    const { result } = renderHook(() => useInsights(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.items).toHaveLength(1);
  });
});
```

## Testing Best Practices

### ✅ DO

1. **Test behavior, not implementation**
   ```typescript
   // ✅ Good - tests user behavior
   expect(screen.getByRole("button")).toBeInTheDocument();
   
   // ❌ Bad - tests implementation
   expect(component.state.isOpen).toBe(true);
   ```

2. **Use accessible queries in order of priority**
   ```typescript
   // 1. getByRole (preferred)
   screen.getByRole("button", { name: /submit/i })
   
   // 2. getByLabelText
   screen.getByLabelText(/email/i)
   
   // 3. getByPlaceholderText
   screen.getByPlaceholderText(/search/i)
   
   // 4. getByText
   screen.getByText(/welcome/i)
   
   // 5. getByTestId (last resort)
   screen.getByTestId("custom-element")
   ```

3. **Use `userEvent` for interactions**
   ```typescript
   import userEvent from "@testing-library/user-event";
   
   const user = userEvent.setup();
   await user.click(screen.getByRole("button"));
   await user.type(screen.getByRole("textbox"), "hello");
   ```

4. **Test async operations properly**
   ```typescript
   // Wait for element to appear
   await waitFor(() => {
     expect(screen.getByText(/loaded/i)).toBeInTheDocument();
   });
   
   // Or use findBy queries
   expect(await screen.findByText(/loaded/i)).toBeInTheDocument();
   ```

5. **Mock external dependencies**
   ```typescript
   vi.mock("../../api/core/services/InsightsService", () => ({
     InsightsService: {
       listInsights: vi.fn(),
     },
   }));
   ```

### ❌ DON'T

1. **Don't test implementation details**
2. **Don't test third-party libraries**
3. **Don't test auto-generated API code**
4. **Don't skip error states**
5. **Don't use `await` without checking what you're waiting for**

## Test Organization

### Structure tests with describe blocks

```typescript
describe("ComponentName", () => {
  describe("rendering", () => {
    it("renders the title", () => {});
    it("renders without errors", () => {});
  });

  describe("interactions", () => {
    it("handles click events", () => {});
    it("updates input value", () => {});
  });

  describe("edge cases", () => {
    it("handles empty state", () => {});
    it("handles error state", () => {});
  });
});
```

## Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test src/app/pages/HomePage.test.tsx
```

## Coverage Requirements

### Current Coverage Threshold: None (To be set later)

While we don't enforce coverage thresholds yet, aim for:
- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

### View Coverage Report

After running `pnpm test:coverage`, open:
```
coverage/index.html
```

## Common Testing Patterns

### 1. Testing Components with Router

```typescript
import { BrowserRouter } from "react-router-dom";

render(
  <BrowserRouter>
    <MyComponent />
  </BrowserRouter>
);
```

### 2. Testing Components with Query Provider

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

render(
  <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
);
```

### 3. Testing Forms

```typescript
import userEvent from "@testing-library/user-event";

it("submits form with valid data", async () => {
  const handleSubmit = vi.fn();
  const user = userEvent.setup();
  
  render(<MyForm onSubmit={handleSubmit} />);
  
  await user.type(screen.getByLabelText(/email/i), "test@example.com");
  await user.type(screen.getByLabelText(/password/i), "password123");
  await user.click(screen.getByRole("button", { name: /submit/i }));
  
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
```

### 4. Testing Error Boundaries

```typescript
it("renders fallback when error occurs", () => {
  const ThrowError = () => {
    throw new Error("Test error");
  };

  // Suppress console.error for this test
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  spy.mockRestore();
});
```

## Checklist for New Code

Before submitting a PR, ensure:

- [ ] All new components have tests
- [ ] All new hooks have tests
- [ ] All new utilities have tests
- [ ] All new stores have tests
- [ ] Tests cover happy path
- [ ] Tests cover error cases
- [ ] Tests cover edge cases
- [ ] Tests use accessible queries
- [ ] Tests don't test implementation details
- [ ] All tests pass: `pnpm test`
- [ ] Linter passes: `pnpm lint`
- [ ] Code is formatted: `pnpm format`

## Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Vitest Docs](https://vitest.dev/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Remember**: Tests are documentation. Write tests that explain what your code does and why it exists.
