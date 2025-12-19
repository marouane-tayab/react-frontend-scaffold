import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("renders the app title", () => {
    render(<App />);
    expect(screen.getByText(/Insight Frontend/i)).toBeInTheDocument();
  });
});
