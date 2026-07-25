import { test, expect } from "@playwright/test";

test.describe("Portfolio smoke", () => {
  test("home page renders key sections without contact form", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#projetos")).toBeVisible();
    await expect(page.locator("#contato")).toHaveCount(0);
    await expect(page.getByRole("link", { name: /^contato$/i })).toHaveCount(0);
  });
});
