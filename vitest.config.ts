import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // テスト環境としてjsdomを指定
    setupFiles: "./vitest.setup.ts", // セットアップファイルへのパス
  },
});
