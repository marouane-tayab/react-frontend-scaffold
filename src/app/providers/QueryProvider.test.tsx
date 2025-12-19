import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { QueryProvider } from './QueryProvider';

describe('QueryProvider', () => {
  it('renders children', () => {
    render(
      <QueryProvider>
        <div>Test Child</div>
      </QueryProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('provides QueryClientProvider context', () => {
    render(
      <QueryProvider>
        <div data-testid="child">Child Component</div>
      </QueryProvider>
    );
    // Verify that the component renders without throwing errors
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
