import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("初期値が正しく設定されること", () => {
    // 1. フックをレンダリング
    const { result } = renderHook(() => useCounter(10));

    // 2. 初期状態を検証
    expect(result.current.count).toBe(10);
  });

  it("incrementを呼び出すとcountが1増えること", () => {
    const { result } = renderHook(() => useCounter());

    // 3. 状態を更新する処理を`act`で囲む
    act(() => {
      result.current.increment();
    });

    // 4. 更新後の状態を検証
    expect(result.current.count).toBe(1);
  });

  it("decrementを呼び出すとcountが1減ること", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });
});
