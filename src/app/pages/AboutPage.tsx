import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <main className="app">
      <h1>About</h1>
      <p>This is a modern React application scaffold with best practices built-in.</p>
      <Link to="/">← Back to Home</Link>
    </main>
  );
}
