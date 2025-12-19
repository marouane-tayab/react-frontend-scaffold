import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("renders the page heading", () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /about/i })).toBeInTheDocument();
  });

  it("renders page description", () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/modern React application scaffold with best practices/i)
    ).toBeInTheDocument();
  });

  it("renders back to home link", () => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>
    );
    const link = screen.getByRole("link", { name: /back to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
