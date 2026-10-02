import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

// 1. メタデータオブジェクト
const meta: Meta<typeof Button> = {
  title: "UI/Button", // Storybookのサイドバーでの表示名
  component: Button, // 対象のコンポーネント
  tags: ["autodocs"], // Docsタブを自動生成
  argTypes: {
    // propsの型定義
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "destructive"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// 2. PrimaryボタンのStory
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

// 3. SecondaryボタンのStory
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

// 4. DestructiveボタンのStory
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Button",
  },
};
