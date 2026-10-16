import { useMemo, useState } from "react";
import TeX from "./TeX";

type TermKey = "c" | "r" | "r2";

const TERMS: Record<
  TermKey,
  { tex: string; chip: string; f: (r: number) => number; show: (r: number) => string }
> = {
  c: { tex: "3", chip: "常数 3", f: () => 3, show: () => "3" },
  r: { tex: "r", chip: "r", f: (r) => r, show: (r) => `${r}` },
  r2: { tex: "r^2", chip: "r²", f: (r) => r * r, show: (r) => `${r * r}` },
};

function Stepper({
  label,
  value,
  onDec,
  onInc,
  decDisabled,
  incDisabled,
}: {
  label: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
  decDisabled: boolean;
  incDisabled: boolean;
}) {
  const b =
    "tappable h-12 w-12 border border-[var(--line)] text-xl font-medium disabled:opacity-30 hover:bg-[var(--line)]";
  return (
    <div className="flex items-center gap-3">
      <span className="w-14 text-sm text-[var(--ink-soft)]">{label}</span>
      <button type="button" className={b} onClick={onDec} disabled={decDisabled} aria-label={`${label} 减一`}>
        −
      </button>
      <span className="w-10 text-center text-2xl font-semibold tabular-nums">
        {value}
      </span>
      <button type="button" className={b} onClick={onInc} disabled={incDisabled} aria-label={`${label} 加一`}>
        +
      </button>
    </div>
  );
}

export default function SumExpander() {
  const [m, setM] = useState(2);
  const [n, setN] = useState(6);
  const [term, setTerm] = useState<TermKey>("r");

  const t = TERMS[term];
  const rs = useMemo(() => {
    const arr: number[] = [];
    for (let r = m; r <= n; r++) arr.push(r);
    return arr;
  }, [m, n]);
  const total = rs.reduce((s, r) => s + t.f(r), 0);

  return (
    <div className="border border-[var(--line)] bg-[var(--paper-raise)]">
      <div className="grid gap-8 px-6 py-8 sm:grid-cols-2 sm:px-10">
        <div className="space-y-5">
          <Stepper
            label="下限 m"
            value={m}
            onDec={() => setM(m - 1)}
            onInc={() => setM(m + 1)}
            decDisabled={m <= 0}
            incDisabled={m >= n}
          />
          <Stepper
            label="上限 n"
            value={n}
            onDec={() => setN(n - 1)}
            onInc={() => setN(n + 1)}
            decDisabled={n <= m}
            incDisabled={n >= 9}
          />
          <div className="flex items-center gap-3">
            <span className="w-14 text-sm text-[var(--ink-soft)]">通用项</span>
            <div className="flex gap-2">
              {(Object.keys(TERMS) as TermKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTerm(k)}
                  aria-pressed={term === k}
                  className={`tappable h-12 border px-4 text-sm font-medium ${
                    term === k
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                      : "border-[var(--line)] hover:bg-[var(--line)]"
                  }`}
                >
                  {TERMS[k].chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 border-t border-[var(--line)] pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-10">
          <TeX
            block
            tex={`\\sum_{r=${m}}^{${n}} ${t.tex} \\;=\\; ${rs
              .map((r) => t.show(r))
              .join(" + ")}`}
            className="text-lg"
          />
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm text-[var(--ink-soft)]">
            <span>
              项数&ensp;
              <span className="font-semibold text-[var(--ink)] tabular-nums">
                {n} − {m} + 1 = {n - m + 1}
              </span>
            </span>
            <span>
              结果&ensp;
              <span className="font-semibold text-[var(--ink)] tabular-nums">
                {total}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)] px-6 py-5 sm:px-10">
        <TeX
          block
          tex="\sum_{r=m}^{n} a_r = a_m + a_{m+1} + a_{m+2} + \cdots + a_n \qquad (n \ge m)"
          className="text-[15px] text-[var(--ink-soft)]"
        />
      </div>
    </div>
  );
}
