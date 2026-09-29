import { test, expect } from "@playwright/test";

test("ホームページにタイトルがあること", async ({ page }) => {
  // 1. ページにアクセス
  await page.goto("https://playwright.dev/");

  // 2. 要素を特定（Locator）
  const title = page.locator(".navbar__inner .navbar__title");

  // 3. アサーション
  await expect(title).toHaveText("Playwright");
});
