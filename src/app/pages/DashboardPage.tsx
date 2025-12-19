import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <main className="app">
      <h1>Dashboard</h1>
      <p>This page is lazy-loaded for optimal code splitting.</p>
      <p>Your dashboard content goes here.</p>
      <Link to="/">← Back to Home</Link>
    </main>
  );
}
