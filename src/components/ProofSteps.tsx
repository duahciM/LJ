import { useState } from "react";
import TeX from "./TeX";

const STEPS = [
  {
    title: "定义命题",
    en: "Define the proposition P(n)",
    body: (
      <>
        <p>明确写出待证的命题表达式。设命题 P(n)：</p>
        <TeX block tex="\sum_{r=1}^{n} r = \frac{n(n+1)}{2}" className="my-3" />
        <p>即要证明它对所有正整数 n 成立。</p>
      </>
    ),
  },
  {
    title: "证明基础情况",
    en: "Prove that P(1) is true",
    body: (
      <>
        <p>令 n = 1，分别计算两边：</p>
        <TeX
          block
          tex="\text{L.H.S.} = \sum_{r=1}^{1} r = 1 \qquad \text{R.H.S.} = \frac{1\,(1+1)}{2} = 1"
          className="my-3"
        />
        <p>L.H.S. = R.H.S.，故 P(1) 成立。</p>
      </>
    ),
  },
  {
    title: "做出假设",
    en: "Assume P(k) is true",
    body: (
      <>
        <p>假设当 n = k（k 为正整数）时命题成立，即归纳假设：</p>
        <TeX block tex="\sum_{r=1}^{k} r = \frac{k(k+1)}{2}" className="my-3" />
      </>
    ),
  },
  {
    title: "证明 P(k+1) 成立",
    en: "Prove that P(k+1) is also true",
    body: (
      <>
        <p>将 n = k+1 代入左边，拆出前 k 项并代入归纳假设：</p>
        <TeX
          block
          tex="\sum_{r=1}^{k+1} r = \sum_{r=1}^{k} r + (k+1) = \frac{k(k+1)}{2} + (k+1)"
          className="my-3"
        />
        <p>提取公因式 (k+1) 并化简：</p>
        <TeX
          block
          tex="= (k+1)\!\left(\frac{k}{2}+1\right) = \frac{(k+1)(k+2)}{2} = \frac{(k+1)\big[(k+1)+1\big]}{2}"
          className="my-3"
        />
        <p>恰为右边代入 n = k+1 的形式，故 P(k+1) 成立。</p>
      </>
    ),
  },
  {
    title: "得出结论",
    en: "Draw the conclusion",
    body: (
      <p>
        由数学归纳法原理，P(n) 对所有正整数 n 均成立。∎
      </p>
    ),
  },
];

export default function ProofSteps() {
  const [revealed, setRevealed] = useState(0); // 已展开到的步骤索引

  return (
    <div className="border border-[var(--line)] bg-[var(--paper-raise)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-6 py-5 sm:px-10">
        <p className="text-sm text-[var(--ink-soft)]">
          例：用数学归纳法证明&ensp;
          <TeX tex="\textstyle\sum_{r=1}^{n} r = \frac{n(n+1)}{2}" />
        </p>
        <div className="flex gap-1.5" aria-hidden>
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 transition-colors duration-300 ${
                i <= revealed ? "bg-[var(--ink)]" : "bg-[var(--line)]"
              }`}
            />
          ))}
        </div>
      </div>

      <ol>
        {STEPS.map((step, i) => {
          const isOpen = i <= revealed;
          return (
            <li
              key={step.title}
              className={i > 0 ? "border-t border-[var(--line)]" : ""}
            >
              <button
                type="button"
                onClick={() => setRevealed(i)}
                aria-expanded={isOpen}
                className="tappable flex w-full items-baseline gap-4 px-6 py-4 text-left sm:px-10"
              >
                <span
                  className={`text-sm tabular-nums ${
                    isOpen ? "text-[var(--ink)]" : "text-[var(--ink-faint)]"
                  }`}
                >
                  Step {i + 1}
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-semibold ${
                      isOpen ? "text-[var(--ink)]" : "text-[var(--ink-faint)]"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="mt-0.5 block text-xs tracking-[0.12em] uppercase text-[var(--ink-faint)]">
                    {step.en}
                  </span>
                </span>
              </button>
              <div className={`collapse-grid ${isOpen ? "open" : ""}`}>
                <div>
                  <div className="px-6 pb-6 pl-[4.4rem] text-[15px] leading-7 text-[var(--ink-soft)] sm:px-10 sm:pl-[6.2rem]">
                    {step.body}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="flex gap-3 border-t border-[var(--line)] px-6 py-5 sm:px-10">
        <button
          type="button"
          onClick={() => setRevealed(Math.min(revealed + 1, STEPS.length - 1))}
          disabled={revealed >= STEPS.length - 1}
          className="tappable bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] disabled:opacity-30"
        >
          下一步 →
        </button>
        <button
          type="button"
          onClick={() => setRevealed(0)}
          className="tappable border border-[var(--line)] px-6 py-3 text-sm font-medium hover:bg-[var(--line)]"
        >
          从头再来
        </button>
      </div>
    </div>
  );
}
