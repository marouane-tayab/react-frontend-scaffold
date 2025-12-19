import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, AboutPage, NotFoundPage } from './pages';

// Example of lazy loading for code splitting
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage }))
);

/**
 * Application router configuration using React Router v7.
 * Organized with lazy loading for optimal code splitting.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

/**
 * Top-level routing component.
 * Delegates to feature-level routes as the app grows.
 */
export function AppRoutes() {
  return <RouterProvider router={router} />;
}
