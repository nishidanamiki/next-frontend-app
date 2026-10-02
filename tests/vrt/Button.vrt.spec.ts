import { test, expect } from '@playwright/test';

test('Primaryボタンの見た目を確認する', async ({ page }) => {
  await page.goto('/iframe.html?id=ui-button--primary&viewMode=story');

  const canvas = page.locator('#storybook-root');

  await expect(canvas).toHaveScreenshot('ui-button-primary.png');
});