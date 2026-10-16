import { useState } from "react";

const COUNT = 8;

export default function Dominoes() {
  const [pushed, setPushed] = useState(false);

  return (
    <div className="border border-[var(--line)] bg-[var(--paper-raise)]">
      <div className="flex items-end justify-between gap-4 px-6 pt-6 sm:px-10">
        <p className="text-xs tracking-[0.2em] uppercase text-[var(--ink-faint)]">
          {pushed ? "归纳在传递 —— 每一块都会倒下" : "轻触第一块多米诺 P(1)"}
        </p>
        <button
          type="button"
          onClick={() => setPushed(false)}
          className={`tappable border border-[var(--line)] px-4 py-2 text-xs font-medium tracking-wide hover:bg-[var(--line)] ${
            pushed ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          重新立起
        </button>
      </div>

      <button
        type="button"
        onClick={() => setPushed(true)}
        aria-label="推倒第一块多米诺，演示数学归纳法"
        className="block w-full cursor-pointer px-6 pb-4 pt-2 sm:px-10"
      >
        <div className="flex h-44 items-end justify-between gap-1 sm:gap-2">
          {Array.from({ length: COUNT }, (_, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col items-center justify-end"
            >
              <div
                className={`domino h-28 w-6 border border-[var(--ink)] bg-[var(--ink)] sm:w-7 ${
                  pushed ? "fallen" : ""
                }`}
                style={{ transitionDelay: pushed ? `${i * 150}ms` : "0ms" }}
              />
              <span className="mt-3 text-[11px] tabular-nums text-[var(--ink-faint)]">
                {i < COUNT - 1 ? `P(${i + 1})` : "…"}
              </span>
            </div>
          ))}
        </div>
      </button>

      <div className="grid border-t border-[var(--line)] sm:grid-cols-2">
        <div className="border-b border-[var(--line)] px-6 py-5 sm:border-b-0 sm:border-r sm:px-10">
          <p className="text-sm font-semibold">① 基底步 Base step</p>
          <p className="mt-1.5 text-[15px] leading-7 text-[var(--ink-soft)]">
            P(1) 为真 —— 第一块多米诺确实被推倒。
          </p>
        </div>
        <div className="px-6 py-5 sm:px-10">
          <p className="text-sm font-semibold">② 归纳步 Inductive step</p>
          <p className="mt-1.5 text-[15px] leading-7 text-[var(--ink-soft)]">
            若 P(k) 为真可推出 P(k+1) 为真 —— 任何一块倒下都会撞倒下一块。
          </p>
        </div>
      </div>
    </div>
  );
}
