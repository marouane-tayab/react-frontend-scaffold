import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="app">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">← Back to Home</Link>
    </main>
  );
}
