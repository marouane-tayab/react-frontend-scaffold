import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders the page title", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /insight frontend/i })).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/React \+ TypeScript \+ Vite, with Jest\/RTL/i)
    ).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /dashboard/i })).toBeInTheDocument();
  });

  it("has correct href for About link", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("has correct href for Dashboard link", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const dashboardLink = screen.getByRole("link", { name: /dashboard/i });
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });
});
