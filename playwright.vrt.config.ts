import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/vrt',

  use: {
    baseURL: 'http://localhost:6006',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: true,
  },
});