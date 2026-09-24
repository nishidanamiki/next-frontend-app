import { describe, it, expect } from "vitest";
import { add } from "./math";

// `add`関数に関するテストをグループ化
describe("add", () => {
  // テストケース1: 正の数の足し算
  it("2つの正の数を正しく足し算できる", () => {
    // 期待値の表明: add(1, 2)の結果は3であるべき
    expect(add(1, 2)).toBe(3);
  });

  // テストケース2: 負の数を含む足し算
  it("負の数を含む足し算が正しくできる", () => {
    expect(add(-1, 5)).toBe(4);
  });

  // テストケース3: ゼロとの足し算
  it("ゼロを足しても値が変わらない", () => {
    expect(add(10, 0)).toBe(10);
  });
});
