import { test, expect } from "@playwright/test";

test("home page has Insight Frontend heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Insight Frontend/i })).toBeVisible();
});


