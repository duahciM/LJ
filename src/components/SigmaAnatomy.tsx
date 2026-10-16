import { useState } from "react";
import TeX from "./TeX";

type PartKey = "upper" | "sigma" | "lower" | "term";

const PARTS: Record<
  PartKey,
  { label: string; title: string; body: string; tex?: string }
> = {
  sigma: {
    label: "Σ",
    title: "求和符号 Sigma",
    body: "希腊字母 Σ（读作 sigma），表示“求和 the sum”。它命令我们：把通用项从下限一直加到上限。",
  },
  upper: {
    label: "n",
    title: "上限 Upper limit",
    body: "求和变量 r 取到的最大值 n，要求 n ≥ m，且 m、n 通常为整数。",
  },
  lower: {
    label: "r = m",
    title: "下限与求和变量",
    body: "m 是 r 的最小取值（下限）；r 是求和变量，又称哑变量 dummy variable——换成 i、j、k 等任何字母，求和结果都不变。",
  },
  term: {
    label: "bᵣ",
    title: "通用项 General term",
    body: "每一个被相加的项的通用表达式。r 从 m 走到 n，依次生成 bₘ, bₘ₊₁, …, bₙ。",
  },
};

export default function SigmaAnatomy() {
  const [active, setActive] = useState<PartKey>("sigma");

  const btn = (key: PartKey, className: string, children: React.ReactNode) => (
    <button
      type="button"
      onClick={() => setActive(key)}
      aria-pressed={active === key}
      className={`tappable rounded-md px-2 py-1 leading-none ${
        active === key
          ? "bg-[var(--ink)] text-[var(--paper)]"
          : "text-[var(--ink)] hover:bg-[var(--line)]"
      } ${className}`}
    >
      {children}
    </button>
  );

  const info = PARTS[active];

  return (
    <div className="border border-[var(--line)] bg-[var(--paper-raise)]">
      <div className="flex flex-col items-center gap-2 px-6 pt-12 pb-10 sm:pt-16">
        <p className="mb-6 text-xs tracking-[0.2em] uppercase text-[var(--ink-faint)]">
          轻触记号的每一部分
        </p>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center gap-1">
            {btn("upper", "text-xl sm:text-2xl font-semibold italic", "n")}
            {btn(
              "sigma",
              "text-7xl sm:text-8xl font-light leading-none px-3",
              <span style={{ fontFamily: "Georgia, serif" }}>Σ</span>
            )}
            {btn(
              "lower",
              "text-xl sm:text-2xl font-semibold italic",
              "r\u2009=\u2009m"
            )}
          </div>
          {btn(
            "term",
            "text-5xl sm:text-6xl font-medium italic self-center",
            <span>
              b<sub className="text-2xl sm:text-3xl">r</sub>
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--line)] px-6 py-6 sm:px-10">
        <p className="text-sm font-semibold tracking-wide">{info.title}</p>
        <p className="mt-2 max-w-xl text-[15px] leading-7 text-[var(--ink-soft)]">
          {info.body}
        </p>
      </div>

      <div className="border-t border-[var(--line)] px-6 py-5 sm:px-10 text-[15px] text-[var(--ink-soft)]">
        <span className="font-semibold text-[var(--ink)]">项数</span>
        ：从 m 加到 n，一共{" "}
        <TeX tex="(n-m+1)" /> 项。
      </div>
    </div>
  );
}
