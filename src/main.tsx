import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './app/routes';
import { QueryProvider } from './app/providers/QueryProvider';
import { AuthProvider } from './app/providers/AuthProvider';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <AuthProvider>
          <Suspense
            fallback={
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                Loading...
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
