import { useState } from "react";
import TeX from "./TeX";

const RULES = [
  {
    name: "常数求和法则",
    en: "Sum of a constant",
    tex: "\\sum_{r=m}^{n} c = c\\,(n-m+1)",
    note: "常数 c 被重复相加 (n−m+1) 次。",
    extra: "特例：当 m = 1 时，",
    extraTex: "\\sum_{r=1}^{n} c = cn",
  },
  {
    name: "常数提取法则",
    en: "Constant multiple",
    tex: "\\sum_{r=m}^{n} c\\,a_r = c \\sum_{r=m}^{n} a_r",
    note: "公共常数因子可以提到求和号外面。",
  },
  {
    name: "和差拆分法则",
    en: "Sum / difference",
    tex: "\\sum_{r=m}^{n} (a_r \\pm b_r) = \\sum_{r=m}^{n} a_r \\pm \\sum_{r=m}^{n} b_r",
    note: "逐项相加（减）的和，可以拆成两个和。",
    extra: "扩展——线性组合：",
    extraTex:
      "\\sum_{r=m}^{n} (p\\,a_r + q\\,b_r) = p \\sum_{r=m}^{n} a_r + q \\sum_{r=m}^{n} b_r",
  },
  {
    name: "区间拼接 / 拆分法则",
    en: "Splitting the range",
    tex: "\\sum_{r=m}^{s} a_r = \\sum_{r=m}^{n} a_r + \\sum_{r=n+1}^{s} a_r",
    note: "条件 m ≤ n < s。一段长求和可以在中间任意处断开，再拼回去。",
  },
];

export default function RuleCards() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-[var(--line)]">
      {RULES.map((rule, i) => {
        const isOpen = open === i;
        return (
          <div key={rule.name} className="border-b border-[var(--line)]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="tappable flex w-full items-baseline gap-4 py-5 text-left sm:gap-8"
            >
              <span className="text-sm tabular-nums text-[var(--ink-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block text-lg font-semibold sm:text-xl">
                  {rule.name}
                </span>
                <span className="mt-0.5 block text-xs tracking-[0.14em] uppercase text-[var(--ink-faint)]">
                  {rule.en}
                </span>
              </span>
              <span
                className="text-2xl font-light text-[var(--ink-soft)] transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                aria-hidden
              >
                +
              </span>
            </button>
            <div className={`collapse-grid ${isOpen ? "open" : ""}`}>
              <div>
                <div className="space-y-4 pb-7 pl-[2.6rem] sm:pl-[4.1rem]">
                  <div className="bg-[var(--paper-raise)] border border-[var(--line)] px-5 py-4">
                    <TeX block tex={rule.tex} className="text-base" />
                  </div>
                  <p className="max-w-xl text-[15px] leading-7 text-[var(--ink-soft)]">
                    {rule.note}
                  </p>
                  {rule.extra && rule.extraTex && (
                    <div className="max-w-xl text-[15px] leading-7 text-[var(--ink-soft)]">
                      <p>{rule.extra}</p>
                      <TeX block tex={rule.extraTex} className="mt-2" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
