import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AuthProvider } from './AuthProvider';

describe('AuthProvider', () => {
  it('renders children', () => {
    render(
      <AuthProvider>
        <div>Test Child</div>
      </AuthProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('acts as a passthrough provider', () => {
    render(
      <AuthProvider>
        <div data-testid="child">
          <span>Nested Content</span>
        </div>
      </AuthProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Nested Content')).toBeInTheDocument();
  });
});
