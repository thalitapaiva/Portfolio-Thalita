import { test, expect } from "@playwright/test";

test.describe("Portfolio smoke", () => {
  test("home page renders key sections and the contact form validates + submits", async ({
    page,
  }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Recebi sua mensagem." }),
      });
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("region", { name: /projetos|trabalhos/i })).toBeVisible().catch(() => {
      // The projects section uses aria-labelledby, not role region; fall back to id.
      return expect(page.locator("#projetos")).toBeVisible();
    });
    await expect(page.locator("#contato")).toBeVisible();

    const form = page.locator("#contato form");
    await form.getByRole("button", { name: /enviar mensagem/i }).click();
    await expect(form.getByText(/informe seu nome/i)).toBeVisible();

    await form.getByLabel(/nome/i).fill("Test User");
    await form.getByLabel(/email/i).fill("test@example.com");
    await form.getByLabel(/assunto/i).fill("Assunto de teste");
    await form
      .getByLabel(/mensagem/i)
      .fill("Mensagem de teste com tamanho suficiente para validar.");

    await form.getByRole("button", { name: /enviar mensagem/i }).click();
    await expect(page.getByText(/recebi sua mensagem/i)).toBeVisible({ timeout: 10_000 });
  });
});
