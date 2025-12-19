import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="app">
      <section className="app-hero">
        <h1 className="app-title">Insight Frontend</h1>
        <p className="app-subtitle">
          React + TypeScript + Vite, with Jest/RTL, Playwright, and OpenAPI client generation.
        </p>

        <nav style={{ marginTop: "2rem" }}>
          <ul style={{ listStyle: "none", display: "flex", gap: "1rem", padding: 0 }}>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  );
}
