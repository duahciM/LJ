import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Check,
  CheckCheck,
  ChevronRight,
  CircleHelp,
  Clock3,
  Expand,
  FlaskConical,
  Focus,
  History,
  Lightbulb,
  List,
  Minus,
  MousePointer2,
  Play,
  Plus,
  RotateCcw,
  Shuffle,
  Sprout,
  X,
} from "lucide-react";
import {
  chapters,
  examples,
  parts,
  proofSteps,
  questions,
  rules,
  type PartKey,
} from "./content";
import { exportNotes } from "./exportNotes";

function MathText({
  children,
  display = false,
  className = "",
}: {
  children: string;
  display?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`math-text ${display ? "math-display" : ""} ${className}`}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(children, {
          displayMode: display,
          throwOnError: false,
        }),
      }}
    />
  );
}

function useSavedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Reading remains available when storage is disabled. */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M22 7H9l8 9-8 9h13"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 5v5M24 22v5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="brand-name">
        知序<span className="brand-english">ZHIXU</span>
      </span>
    </span>
  );
}

function HeroIllustration() {
  return (
    <svg
      className="hero-illustration"
      viewBox="0 0 430 265"
      fill="none"
      role="img"
      aria-label="从有限求和到无限递推：求和公式与依次倾倒的骨牌"
    >
      <defs>
        <pattern
          id="hero-dots"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.75" fill="#8a9d80" opacity=".27" />
        </pattern>
        <linearGradient
          id="domino-face"
          x1="0"
          y1="0"
          x2="25"
          y2="65"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#d5dfc6" />
          <stop offset="1" stopColor="#a7bc96" />
        </linearGradient>
      </defs>
      <path d="M26 16h376v230H26z" fill="url(#hero-dots)" />
      <path
        d="M54 226c63-18 96 15 180-7s110-23 151-20"
        stroke="#a3b297"
        strokeWidth="1"
        opacity=".45"
      />
      <g fontFamily="Georgia, serif" fill="#354d3c">
        <text x="75" y="105" fontSize="73">
          ∑
        </text>
        <text x="99" y="45" fontSize="17" fontStyle="italic">
          n
        </text>
        <text x="85" y="128" fontSize="14" fontStyle="italic">
          r = 1
        </text>
        <text x="140" y="94" fontSize="33" fontStyle="italic">
          r
        </text>
        <text x="176" y="94" fontSize="25" fill="#839279">
          =
        </text>
        <text x="222" y="75" fontSize="25" fontStyle="italic">
          n(n + 1)
        </text>
        <path d="M219 87h105" stroke="#354d3c" strokeWidth="1.3" />
        <text x="267" y="116" fontSize="25">
          2
        </text>
      </g>
      <path
        d="M73 162c51-33 126-32 173-5"
        stroke="#859a75"
        strokeWidth="1.3"
        strokeDasharray="4 5"
      />
      <path
        d="m238 149 9 9-13 1"
        stroke="#859a75"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g
          key={i}
          transform={`translate(${83 + i * 46}, ${198 - i * 2}) rotate(${-58 + i * 11})`}
        >
          <path
            d="M0 0h18V-57H0z"
            fill="url(#domino-face)"
            stroke="#7d9670"
            strokeWidth="1"
          />
          <path
            d="m18 0 5-4v-57l-5 4z"
            fill="#819772"
            stroke="#7d9670"
            strokeWidth=".7"
          />
          <path
            d="m0-57 5-4h18l-5 4z"
            fill="#e0e7d8"
            stroke="#7d9670"
            strokeWidth=".7"
          />
          <path d="M3-28h12" stroke="#90a481" strokeWidth=".8" />
          <circle cx="9" cy="-42" r="1.8" fill="#6d8662" />
          <circle cx="9" cy="-15" r="1.8" fill="#6d8662" />
        </g>
      ))}
      <g
        fill="#74836a"
        fontFamily="Georgia, serif"
        fontSize="13"
        fontStyle="italic"
      >
        <text x="67" y="239">
          P(1)
        </text>
        <text x="235" y="232">
          P(k)
        </text>
        <text x="322" y="225">
          P(k+1)
        </text>
      </g>
      <path
        d="M365 127v12m-6-6h12"
        stroke="#93a67e"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="45" cy="76" r="3" stroke="#afbd9e" />
    </svg>
  );
}

function SectionHeading({
  number,
  title,
  english,
  children,
}: {
  number: string;
  title: string;
  english: string;
  children: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="section-title-line">
        <span className="section-number">{number}</span>
        <h2>{title}</h2>
        <span className="section-english">{english}</span>
      </div>
      <p>{children}</p>
    </div>
  );
}

function CompleteButton({
  done,
  onClick,
  last = false,
}: {
  done: boolean;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <div className="complete-row">
      <span>
        <Sprout size={15} /> 每理解一点，都是向前一步。
      </span>
      <button
        className={`text-button ${done ? "is-complete" : ""}`}
        onClick={onClick}
      >
        {done ? <CheckCheck size={16} /> : <Check size={16} />}
        {done
          ? "已掌握，再往前一步"
          : last
            ? "完成本节，去练一练"
            : "我理解了，继续下一节"}
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

function Anatomy() {
  const [selected, setSelected] = useState<PartKey>("term");
  const part = parts[selected];
  return (
    <div className="anatomy interaction-panel">
      <div className="panel-topline">
        <span>
          <MousePointer2 size={14} /> 一个符号，四个部分
        </span>
        <span className="quiet-label">点击公式，探索它的含义</span>
      </div>
      <div className="anatomy-main">
        <div className="formula-stage">
          <div
            className="anatomy-formula"
            aria-label="求和记号各部分，点击探索"
          >
            <div className="sigma-stack">
              <button
                className={`part-button upper-part ${selected === "upper" ? "selected" : ""}`}
                onClick={() => setSelected("upper")}
                aria-label="上限 n"
                aria-pressed={selected === "upper"}
              >
                <MathText>n</MathText>
              </button>
              <span className="sigma-symbol" aria-hidden="true">
                ∑
              </span>
              <div className="lower-parts">
                <button
                  className={`part-button ${selected === "index" ? "selected" : ""}`}
                  onClick={() => setSelected("index")}
                  aria-label="求和变量 r"
                  aria-pressed={selected === "index"}
                >
                  <MathText>r</MathText>
                </button>
                <span>=</span>
                <button
                  className={`part-button ${selected === "lower" ? "selected" : ""}`}
                  onClick={() => setSelected("lower")}
                  aria-label="下限 m"
                  aria-pressed={selected === "lower"}
                >
                  <MathText>m</MathText>
                </button>
              </div>
            </div>
            <button
              className={`part-button term-part ${selected === "term" ? "selected" : ""}`}
              onClick={() => setSelected("term")}
              aria-label="通用项 b_r"
              aria-pressed={selected === "term"}
            >
              <MathText>b_r</MathText>
            </button>
          </div>
          <span className="sigma-pronunciation">
            Σ 读作 sigma，表示「求和」
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="part-description"
            key={selected}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.16 }}
            aria-live="polite"
          >
            <div className="part-description-title">
              <span className="part-symbol">
                <MathText>{part.symbol}</MathText>
              </span>
              <h3>{part.name}</h3>
              <span>{part.english}</span>
            </div>
            <p>{part.description}</p>
            <MathText className="part-example">{part.example}</MathText>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="anatomy-footer">
        <span>展开来看</span>
        <MathText>{String.raw`\sum_{r=m}^{n}a_r=a_m+a_{m+1}+\cdots+a_n`}</MathText>
      </div>
    </div>
  );
}

function SummationPlayground() {
  const [lower, setLower] = useState(2);
  const [upper, setUpper] = useState(6);
  const [term, setTerm] = useState(0);
  const [dummy, setDummy] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const variable = ["r", "i", "k"][dummy];
  const getValue = (r: number) =>
    term === 0 ? r : term === 1 ? r * r : 2 * r + 1;
  const values = Array.from({ length: upper - lower + 1 }, (_, i) => lower + i);
  const total = values.reduce((sum, r) => sum + getValue(r), 0);
  const generalTerm =
    term === 0
      ? variable
      : term === 1
        ? `${variable}^2`
        : String.raw`\left(2${variable}+1\right)`;
  return (
    <div className="summation-playground">
      <div className="subsection-title">
        <h3>
          <FlaskConical size={17} /> 让求和动起来
        </h3>
        <span>拖动滑块，看看发生什么</span>
      </div>
      <div className="playground-body interaction-panel">
        <div className="playground-controls">
          <label className="range-control">
            <span>
              下限 <MathText>m</MathText>
              <strong>{lower}</strong>
            </span>
            <input
              aria-label="求和下限"
              type="range"
              min="1"
              max="8"
              value={lower}
              onChange={(e) => {
                const n = Number(e.target.value);
                setLower(n);
                if (n > upper) setUpper(n);
                setSelectedTerm(null);
              }}
            />
            <span className="range-endpoints">
              <span>1</span>
              <span>8</span>
            </span>
          </label>
          <label className="range-control">
            <span>
              上限 <MathText>n</MathText>
              <strong>{upper}</strong>
            </span>
            <input
              aria-label="求和上限"
              type="range"
              min="1"
              max="12"
              value={upper}
              onChange={(e) => {
                const n = Number(e.target.value);
                setUpper(n);
                if (n < lower) setLower(n);
                setSelectedTerm(null);
              }}
            />
            <span className="range-endpoints">
              <span>1</span>
              <span>12</span>
            </span>
          </label>
          <div className="term-control">
            <span>
              通用项 <MathText>{`b_${variable}`}</MathText>
            </span>
            <div className="segmented-control">
              {["r", "r^2", "2r+1"].map((t, i) => (
                <button
                  className={term === i ? "active" : ""}
                  key={t}
                  onClick={() => {
                    setTerm(i);
                    setSelectedTerm(null);
                  }}
                  aria-pressed={term === i}
                >
                  <MathText>{t.replace("r", variable)}</MathText>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="sum-visualization" aria-live="polite">
          <MathText
            className="dynamic-sum"
            display
          >{String.raw`\sum_{${variable}=${lower}}^{${upper}}${generalTerm}`}</MathText>
          <span className="equals-sign">=</span>
          <div className="sum-terms">
            {values.map((r, i) => (
              <span className="sum-term-wrap" key={r}>
                {i > 0 && <span className="term-plus">+</span>}
                <button
                  className={`number-term ${selectedTerm === r ? "selected" : ""}`}
                  onClick={() => setSelectedTerm(r)}
                  aria-label={`查看 ${variable} 等于 ${r} 时的项`}
                >
                  {getValue(r)}
                </button>
              </span>
            ))}
          </div>
          <span className="equals-sign">=</span>
          <motion.strong
            className="sum-total"
            key={total}
            initial={{ y: 5, opacity: 0.4 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {total}
          </motion.strong>
        </div>
        <div className="playground-bottom">
          <span>
            {selectedTerm !== null ? (
              <>
                <MathText>{`${variable}=${selectedTerm}`}</MathText>{" "}
                时，这一项为{" "}
                <MathText>{`${term === 0 ? selectedTerm : term === 1 ? `${selectedTerm}^2` : String.raw`2\cdot${selectedTerm}+1`}=${getValue(selectedTerm)}`}</MathText>
              </>
            ) : (
              <>
                共 <strong>{upper - lower + 1}</strong> 项 · 轻触数字可查看单项
              </>
            )}
          </span>
          <button
            className="text-button muted"
            onClick={() => setDummy((dummy + 1) % 3)}
          >
            <Shuffle size={13} /> 换个变量试试
          </button>
        </div>
      </div>
      <div className="helper-line">
        <Lightbulb size={15} />
        <span>
          两端都要算：总项数为 <MathText>n-m+1</MathText>。这里{" "}
          <MathText>{String.raw`n\ge m`}</MathText>，且 <MathText>m,n</MathText>{" "}
          都是整数。
        </span>
      </div>
    </div>
  );
}

function SummationRules() {
  const [open, setOpen] = useState<number | null>(0);
  const [constant, setConstant] = useState(3);
  return (
    <div className="rules-list">
      {rules.map((rule, i) => (
        <div
          className={`rule-item ${open === i ? "open" : ""}`}
          key={rule.title}
        >
          <button
            className="rule-trigger"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`rule-content-${i}`}
          >
            <span className="rule-index">0{i + 1}</span>
            <span className="rule-name">{rule.title}</span>
            <span className="rule-english">{rule.english}</span>
            {open === i ? <Minus size={17} /> : <Plus size={17} />}
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                id={`rule-content-${i}`}
                className="rule-content-wrap"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="rule-content">
                  <p>{rule.description}</p>
                  <MathText display>{rule.formula}</MathText>
                  <div className="rule-detail">
                    <span>
                      {i === 0 ? "特别地" : i === 2 ? "线性组合" : "记住这个"}
                    </span>
                    <MathText>{rule.detail}</MathText>
                  </div>
                  {i === 0 && (
                    <div className="constant-experiment">
                      <span>
                        让 <MathText>c=</MathText>
                      </span>
                      <button
                        className="tiny-button"
                        aria-label="减小常数"
                        disabled={constant === 1}
                        onClick={() => setConstant(constant - 1)}
                      >
                        <Minus size={13} />
                      </button>
                      <strong>{constant}</strong>
                      <button
                        className="tiny-button"
                        aria-label="增大常数"
                        disabled={constant === 9}
                        onClick={() => setConstant(constant + 1)}
                      >
                        <Plus size={13} />
                      </button>
                      <MathText>{String.raw`\quad\sum_{r=2}^{6}${constant}=${constant}\times5=${constant * 5}`}</MathText>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function InductionExperiment() {
  const [base, setBase] = useState(true);
  const [chain, setChain] = useState(true);
  const [fallen, setFallen] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!playing) return;
    let count = 0;
    const timer = window.setInterval(
      () => {
        count += 1;
        setFallen(count);
        if (count >= (chain ? 7 : 1)) {
          window.clearInterval(timer);
          setPlaying(false);
        }
      },
      reducedMotion ? 160 : 340,
    );
    return () => window.clearInterval(timer);
  }, [playing, chain, reducedMotion]);
  const play = () => {
    setFallen(0);
    setPlayed(true);
    if (base) setPlaying(true);
  };
  const reset = () => {
    setPlaying(false);
    setFallen(0);
    setPlayed(false);
  };
  const feedback = !played
    ? "试着关闭一个条件，再推一次。你会发现两步缺一不可。"
    : !base
      ? "没有基底步，第一块骨牌不会倒下，证明也就没有起点。"
      : !chain
        ? "只有第一块倒下了。缺少归纳步，结论无法传递到下一项。"
        : playing
          ? "从第一块开始，让成立的结论逐个传递……"
          : "从 P(1) 到 P(2)，再到 P(3)……每一个正整数都被连接起来。";
  return (
    <div className="induction-lab interaction-panel">
      <div className="lab-heading">
        <span>
          <FlaskConical size={16} /> 归纳法的骨牌实验
        </span>
        <button className="lab-reset" onClick={reset} aria-label="重置骨牌实验">
          <RotateCcw size={15} /> 重置
        </button>
      </div>
      <div className="lab-description">
        第一块要倒下，每一块也要能推倒下一块。
      </div>
      <div className="domino-scene" aria-label={`已有 ${fallen} 块骨牌倒下`}>
        {Array.from({ length: 7 }, (_, i) => (
          <div className="domino-position" key={i}>
            <div
              className={`domino-block ${fallen > i ? "fallen" : ""} ${i === 0 ? "first-domino" : ""}`}
            >
              <span />
              <span />
              <i />
              <span />
              <span />
            </div>
            <span className="domino-label">
              {i === 0
                ? "P(1)"
                : i === 1
                  ? "P(2)"
                  : i === 2
                    ? "P(3)"
                    : i === 3
                      ? "···"
                      : i === 4
                        ? "P(k)"
                        : i === 5
                          ? "P(k+1)"
                          : "···"}
            </span>
          </div>
        ))}
        <div className="domino-ground" />
      </div>
      <div className="lab-conditions">
        <button
          role="switch"
          aria-checked={base}
          disabled={playing}
          className="condition-switch"
          onClick={() => {
            setBase(!base);
            reset();
          }}
        >
          <span className={`switch-track ${base ? "on" : ""}`}>
            <span />
          </span>
          <span>
            <strong>基底步</strong>
            <span>P(1) 成立</span>
          </span>
        </button>
        <button
          role="switch"
          aria-checked={chain}
          disabled={playing}
          className="condition-switch"
          onClick={() => {
            setChain(!chain);
            reset();
          }}
        >
          <span className={`switch-track ${chain ? "on" : ""}`}>
            <span />
          </span>
          <span>
            <strong>归纳步</strong>
            <span>P(k) ⇒ P(k+1)</span>
          </span>
        </button>
        <button className="lab-play" onClick={play} disabled={playing}>
          <Play size={14} fill="currentColor" />
          {playing ? "正在传递…" : "推一下，看看"}
          {!playing && <ArrowRight size={14} />}
        </button>
      </div>
      <p
        className={`lab-feedback ${played && !playing ? "has-result" : ""}`}
        aria-live="polite"
      >
        <Lightbulb size={14} />
        {feedback}
      </p>
    </div>
  );
}

function ProofExplorer({ onComplete }: { onComplete: () => void }) {
  const [example, setExample] = useState(0);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const touchStart = useRef<number | null>(null);
  const data = examples[example];
  const stepDescriptions = [
    <>
      先把要证明的等式命名为 <MathText>P(n)</MathText>，明确它讨论的是所有正整数{" "}
      <MathText>n</MathText>。
    </>,
    <>
      令 <MathText>n=1</MathText>，分别计算等式左边与右边，验证证明的起点。
    </>,
    <>
      假设当 <MathText>n=k</MathText> 时命题成立，其中 <MathText>k</MathText>{" "}
      是任意正整数。
    </>,
    <>
      拆出第 <MathText>k+1</MathText> 项，用归纳假设替换前{" "}
      <MathText>k</MathText> 项，再整理为目标形式。
    </>,
    <>基底步和归纳步都已完成，现在把两者连起来，写出完整结论。</>,
  ];
  const goToStep = (n: number) => {
    setStep(Math.max(0, Math.min(4, n)));
    setFinished(false);
  };
  return (
    <div className="proof-explorer interaction-panel">
      <div className="proof-topline">
        <span>选择一道例题</span>
        <div className="proof-example-tabs">
          {examples.map((ex, i) => (
            <button
              className={example === i ? "active" : ""}
              key={ex.name}
              onClick={() => {
                setExample(i);
                setStep(0);
                setFinished(false);
              }}
              aria-pressed={example === i}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>
      <div className="proof-target">
        <span>我们要证明</span>
        <MathText display>{data.formula}</MathText>
        <span>对所有正整数 n 成立</span>
      </div>
      <div className="proof-workspace">
        <nav className="proof-step-nav" aria-label="证明步骤">
          {proofSteps.map((item, i) => (
            <button
              className={`${step === i ? "active" : ""} ${step > i || finished ? "past" : ""}`}
              key={item.title}
              onClick={() => goToStep(i)}
              aria-current={step === i ? "step" : undefined}
            >
              <span className="step-number">
                {step > i || finished ? <Check size={13} /> : i + 1}
              </span>
              <span>
                <strong>{item.title}</strong>
                <span>{item.english}</span>
              </span>
            </button>
          ))}
        </nav>
        <div
          className="proof-step-content"
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStart.current !== null) {
              const diff = touchStart.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 65) goToStep(step + (diff > 0 ? 1 : -1));
              touchStart.current = null;
            }
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${example}-${step}`}
              className="proof-current-step"
              initial={{ opacity: 0, x: 9 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -9 }}
              transition={{ duration: 0.17 }}
            >
              <span className="step-eyebrow">STEP 0{step + 1} / 05</span>
              <h3>{proofSteps[step].title}</h3>
              <p>{stepDescriptions[step]}</p>
              {step === 0 && (
                <>
                  <div className="proof-formula">
                    <MathText
                      display
                    >{String.raw`P(n):\quad ${data.formula}`}</MathText>
                  </div>
                  <p className="proof-note">
                    目标不是验证几个数，而是证明每个正整数都成立。
                  </p>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="proof-formula">
                    <MathText display>{data.base}</MathText>
                  </div>
                  <p className="proof-note">
                    <Check size={14} /> L.H.S. = R.H.S.，因此 P(1) 成立。
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="proof-formula">
                    <MathText display>{data.assumption}</MathText>
                  </div>
                  <p className="proof-note">
                    这是「归纳假设」，是下一步推导可以使用的已知条件。
                  </p>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="proof-formula derivation">
                    <MathText display>{data.derivation}</MathText>
                  </div>
                  <p className="proof-note">
                    <Lightbulb size={14} /> 结果正好是右边代入 k+1
                    的形式，P(k+1) 成立。
                  </p>
                </>
              )}
              {step === 4 && (
                <div className="proof-conclusion">
                  <CheckCheck size={25} />
                  <p>
                    P(1) 成立；假设 P(k) 成立，可以推出 P(k+1) 成立。
                    <br />
                    因此，根据数学归纳法，
                    <strong>P(n) 对所有正整数 n 均成立。</strong>
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="proof-step-controls">
            <button
              className="text-button muted"
              disabled={step === 0}
              onClick={() => goToStep(step - 1)}
            >
              <ArrowLeft size={14} /> 上一步
            </button>
            <span className="step-dots">
              {proofSteps.map((_, i) => (
                <span className={i === step ? "active" : ""} key={i} />
              ))}
            </span>
            <button
              className="primary-button small"
              onClick={() => {
                if (step < 4) goToStep(step + 1);
                else {
                  setFinished(true);
                  onComplete();
                }
              }}
            >
              {step < 4 ? "下一步" : finished ? "证明已完成" : "完成证明"}
              {finished ? <Check size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>
        </div>
      </div>
      <div className="proof-footer">
        <MousePointer2 size={13} /> 点击左侧步骤自由探索，或在触屏上左右滑动。
        {finished && (
          <span>
            <CheckCheck size={14} /> 你已完成一次严谨的归纳证明
          </span>
        )}
      </div>
    </div>
  );
}

function Practice({ onFinish }: { onFinish: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const reset = () => {
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
  };
  return (
    <div className="practice-panel interaction-panel">
      {finished ? (
        <motion.div
          className="quiz-summary"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="summary-icon">
            <CheckCheck size={29} />
          </span>
          <span className="step-eyebrow">
            A LITTLE PRACTICE, A LOT OF PROGRESS
          </span>
          <h3>{score === 3 ? "每一步，都很扎实。" : "理解，正在慢慢发生。"}</h3>
          <p>
            本次答对 <strong>{score} / 3</strong> 题。
            {score === 3
              ? "你已经抓住了求和与归纳的核心。"
              : "再回看一下笔记，让遗漏的细节变得清晰。"}
          </p>
          <button className="primary-button" onClick={reset}>
            <RotateCcw size={15} /> 再练一次
          </button>
        </motion.div>
      ) : (
        <>
          <div className="quiz-topline">
            <span>
              <CircleHelp size={15} /> 小小测验
            </span>
            <span>
              0{index + 1}
              <span className="muted"> / 03</span>
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="quiz-question">{question.question}</h3>
              <MathText className="quiz-formula" display>
                {question.formula}
              </MathText>
              <div
                className={`quiz-options ${question.math ? "math-options" : ""}`}
              >
                {question.options.map((option, i) => (
                  <button
                    className={`quiz-option ${selected === i ? "selected" : ""} ${submitted && i === question.answer ? "correct" : ""} ${submitted && selected === i && selected !== question.answer ? "incorrect" : ""}`}
                    key={option}
                    onClick={() => setSelected(i)}
                    disabled={submitted}
                    aria-pressed={selected === i}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {question.math ? (
                      <MathText>{option}</MathText>
                    ) : (
                      <span>{option}</span>
                    )}
                    {submitted && i === question.answer && <Check size={17} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="quiz-bottom">
            {submitted ? (
              <p
                className={`quiz-feedback ${selected === question.answer ? "correct" : ""}`}
                aria-live="polite"
              >
                <span>
                  {selected === question.answer ? "答对了！" : "再留意一下："}
                </span>
                {question.explanation}
              </p>
            ) : (
              <p className="muted">不必着急，想清楚再选。</p>
            )}
            <button
              className="primary-button small"
              disabled={selected === null}
              onClick={() => {
                if (!submitted) {
                  setSubmitted(true);
                  if (selected === question.answer) setScore(score + 1);
                } else if (index < 2) {
                  setIndex(index + 1);
                  setSelected(null);
                  setSubmitted(false);
                } else {
                  setFinished(true);
                  onFinish(score);
                }
              }}
            >
              {!submitted ? "确认答案" : index < 2 ? "下一题" : "查看结果"}
              <ArrowRight size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Drawer({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="drawer"
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="drawer-inner"
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="drawer-header">
          <div>
            <span className="step-eyebrow">YOUR LEARNING SPACE</span>
            <h2>{title}</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="关闭面板"
          >
            <X size={21} />
          </button>
        </div>
        <p className="drawer-subtitle">{subtitle}</p>
        {children}
        <div className="drawer-bottom">
          <Brand compact />
          <span>每一次理解，都值得留下。</span>
        </div>
      </motion.div>
    </dialog>
  );
}

export default function App() {
  const [active, setActive] = useState("notation");
  const [completed, setCompleted] = useSavedState<string[]>(
    "zhixu-completed",
    [],
  );
  const [bookmarked, setBookmarked] = useSavedState("zhixu-bookmarked", false);
  const [bestScore, setBestScore] = useSavedState<number | null>(
    "zhixu-best-score",
    null,
  );
  const [lastStudy, setLastStudy] = useSavedState<string>(
    "zhixu-last-study",
    "",
  );
  const [focus, setFocus] = useState(false);
  const [drawer, setDrawer] = useState<"saved" | "history" | "contents" | null>(
    null,
  );
  const [toast, setToast] = useState("");
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        let current = "notation";
        [...chapters.map((chapter) => chapter.id), "practice"].forEach((id) => {
          const element = document.getElementById(id);
          if (
            element &&
            element.getBoundingClientRect().top <= window.innerHeight * 0.31
          )
            current = id;
        });
        setActive(current);
      });
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    const initial = window.location.hash.slice(1);
    if (
      [...chapters.map((chapter) => chapter.id), "practice"].includes(initial)
    )
      document.getElementById(initial)?.scrollIntoView();
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (toast) {
      const timer = window.setTimeout(() => setToast(""), 3200);
      return () => window.clearTimeout(timer);
    }
  }, [toast]);
  const navigate = (id: string) => {
    setDrawer(null);
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    window.setTimeout(
      () =>
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: reducedMotion ? "instant" : "smooth",
            block: "start",
          }),
      30,
    );
  };
  const markComplete = (id: string, goNext = true) => {
    setCompleted((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
    setLastStudy(new Date().toISOString());
    if (goNext) {
      const next = chapters[chapters.findIndex((c) => c.id === id) + 1];
      navigate(next?.id ?? "practice");
    } else setToast("证明已完成，这一步已经记在你的学习进度里。");
  };
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    setToast(bookmarked ? "已从收藏中移除本章" : "已收藏本章，随时回来温习。");
  };
  const progress = chapters.filter((chapter) =>
    completed.includes(chapter.id),
  ).length;
  const chapterNavigation = (
    <nav className="chapter-navigation" aria-label="章节导航">
      {chapters.map((chapter) => (
        <button
          className={`chapter-link ${active === chapter.id ? "active" : ""}`}
          key={chapter.id}
          onClick={() => navigate(chapter.id)}
          aria-current={active === chapter.id ? "location" : undefined}
        >
          <span
            className={`chapter-nav-number ${completed.includes(chapter.id) ? "done" : ""}`}
          >
            {completed.includes(chapter.id) ? (
              <Check size={13} />
            ) : (
              chapter.number
            )}
          </span>
          <span>
            <strong>{chapter.title}</strong>
            <span>{chapter.english}</span>
          </span>
          {active === chapter.id && <span className="active-dot" />}
        </button>
      ))}
    </nav>
  );

  return (
    <div className={`app ${focus ? "focus-mode" : ""}`}>
      <a href="#main-content" className="skip-link">
        跳到学习内容
      </a>
      <header className="site-header">
        <a
          className="brand-link"
          href="#"
          aria-label="知序首页"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: reducedMotion ? "instant" : "smooth",
            });
          }}
        >
          <Brand />
        </a>
        <nav className="top-navigation" aria-label="主导航">
          <button
            className={drawer === null ? "active" : ""}
            onClick={() => {
              setDrawer(null);
              window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "instant" : "smooth",
              });
            }}
          >
            学习笔记
          </button>
          <button
            className={drawer === "saved" ? "active" : ""}
            onClick={() => setDrawer("saved")}
          >
            我的收藏
          </button>
          <button
            className={drawer === "history" ? "active" : ""}
            onClick={() => setDrawer("history")}
          >
            学习记录
          </button>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setDrawer("contents")}
            aria-label="打开章节目录"
          >
            <List size={20} />
          </button>
          <button
            className={`focus-button ${focus ? "active" : ""}`}
            onClick={() => {
              setFocus(!focus);
              setToast(
                focus
                  ? "已返回完整学习空间"
                  : "专注模式已开启，给思考多一点空间。",
              );
            }}
            aria-pressed={focus}
            aria-label={focus ? "退出专注模式" : "进入专注模式"}
            title={focus ? "退出专注模式" : "进入专注模式"}
          >
            {focus ? <Expand size={17} /> : <Focus size={17} />}
            <span>{focus ? "退出专注" : "专注模式"}</span>
          </button>
          <span className="header-divider" />
          <button
            className="export-button"
            onClick={() => {
              exportNotes();
              setToast("HTML 笔记已导出，可离线阅读、交互和打印。");
            }}
          >
            <ArrowDownToLine size={15} />
            <span>导出笔记</span>
          </button>
          <button
            className="avatar"
            onClick={() => setDrawer("history")}
            aria-label="查看我的学习记录"
          >
            知
          </button>
        </div>
      </header>

      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="notebook-label">
            <BookOpen size={16} />
            <span>我的数学笔记本</span>
          </div>
          <div className="sidebar-chapter-label">
            CHAPTER 01<span>代数与证明</span>
          </div>
          {chapterNavigation}
          <div className="sidebar-practice">
            <span className="sidebar-mini-label">学以致用</span>
            <button
              className={active === "practice" ? "active" : ""}
              onClick={() => navigate("practice")}
            >
              <FlaskConical size={17} />
              <span>随堂练习</span>
              <span className="practice-count">3 题</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-quote">
            <svg viewBox="0 0 80 55" fill="none" aria-hidden="true">
              <path
                d="M13 43c12-5 18-21 26-20 7 1 7 15 14 11s8-15 15-20"
                stroke="#a5b397"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="m61 14 8-2-1 8"
                stroke="#a5b397"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M12 49h58M12 49V9" stroke="#d5dccf" strokeWidth="1" />
            </svg>
            <p>
              不止记住公式，
              <br />
              更要看见数学的逻辑。
            </p>
          </div>
          <div className="progress-heading">
            <span>本章学习进度</span>
            <strong>
              {progress}
              <span> / 4</span>
            </strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress * 25}%` }} />
          </div>
          <span className="progress-caption">
            {progress === 4
              ? "这一章，已成为你的知识。"
              : "每一次理解，都离答案更近。"}
          </span>
        </div>
      </aside>

      <div className="mobile-chapter-strip">
        {chapters.map((chapter) => (
          <button
            className={active === chapter.id ? "active" : ""}
            onClick={() => navigate(chapter.id)}
            key={chapter.id}
          >
            {chapter.number}
            <span>
              {chapter.title
                .replace("求和运算法则", "运算法则")
                .replace("归纳法证明", "证明实战")}
            </span>
          </button>
        ))}
        <button
          className={active === "practice" ? "active" : ""}
          onClick={() => navigate("practice")}
        >
          <FlaskConical size={14} />
          练习
        </button>
      </div>

      <main className="main-content" id="main-content">
        <div className="breadcrumb-row">
          <div className="breadcrumbs">
            <BookOpen size={13} />
            <span>学习笔记</span>
            <ChevronRight size={12} />
            <span>代数与证明</span>
            <ChevronRight size={12} />
            <span>第一章</span>
          </div>
          <button
            className={`bookmark-button ${bookmarked ? "bookmarked" : ""}`}
            onClick={toggleBookmark}
            aria-pressed={bookmarked}
          >
            <Bookmark size={14} fill={bookmarked ? "currentColor" : "none"} />
            <span>{bookmarked ? "已收藏" : "收藏本章"}</span>
          </button>
        </div>
        <motion.section
          className="lesson-hero"
          initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          aria-label="本章介绍"
        >
          <div className="hero-copy">
            <div className="lesson-eyebrow">
              <span /> LITTLE SYMBOLS, BIG IDEAS
            </div>
            <h1>
              求和记号与
              <br />
              数学归纳法<span className="title-period">.</span>
            </h1>
            <p>把零散的项连成整体，让一个结论走向无穷。</p>
            <div className="hero-footnote">
              <Clock3 size={13} />
              <span>约 15 分钟</span>
              <span className="footnote-dot" />
              一边探索，一边理解
              <ArrowDown size={13} />
            </div>
          </div>
          <motion.div
            className="hero-art"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <HeroIllustration />
          </motion.div>
        </motion.section>

        <section className="learning-section first-section" id="notation">
          <SectionHeading
            number="01"
            title="认识求和记号"
            english="SUMMATION NOTATION"
          >
            很多项的和，也可以写得很简洁。
          </SectionHeading>
          <Anatomy />
          <SummationPlayground />
          <CompleteButton
            done={completed.includes("notation")}
            onClick={() => markComplete("notation")}
          />
        </section>

        <section className="learning-section" id="rules">
          <SectionHeading
            number="02"
            title="让求和更简单"
            english="RULES OF SUMMATION"
          >
            提取、拆分、拼接。复杂的式子，也有清晰的规则。
          </SectionHeading>
          <div className="section-intro">
            设 <MathText>a_r,b_r</MathText> 是两个序列，
            <MathText>c,p,q</MathText> 是常数。点击规则，展开它的逻辑。
          </div>
          <SummationRules />
          <CompleteButton
            done={completed.includes("rules")}
            onClick={() => markComplete("rules")}
          />
        </section>

        <section className="learning-section" id="induction">
          <SectionHeading
            number="03"
            title="从一个，走向每一个"
            english="MATHEMATICAL INDUCTION"
          >
            验证很多次，不等于证明每一次。数学归纳法把「所有」连接起来。
          </SectionHeading>
          <div className="proposition-intro">
            <span className="margin-note">先认识一个词</span>
            <p>
              <strong>命题 Proposition</strong>
              ，是能够明确判断为真或为假的陈述句。
              <br />
              对于关于正整数 <MathText>n</MathText> 的命题{" "}
              <MathText>P(n)</MathText>
              ，逐一验证永远到不了无穷，我们需要一条能不断递推的逻辑链。
            </p>
          </div>
          <InductionExperiment />
          <div className="induction-principle">
            <div>
              <span className="principle-number">I.</span>
              <h3>一个可靠的起点</h3>
              <MathText>{String.raw`P(1)\text{ 为真}`}</MathText>
              <p>基底步 Base step</p>
            </div>
            <div>
              <span className="principle-number">II.</span>
              <h3>一条不断延伸的逻辑</h3>
              <MathText>{String.raw`P(k)\Longrightarrow P(k+1)`}</MathText>
              <p>归纳步 Inductive step · k 为任意正整数</p>
            </div>
          </div>
          <div className="principle-conclusion">
            <CheckCheck size={17} />
            <p>
              满足这两个条件，<MathText>P(n)</MathText> 就对
              <strong>所有正整数</strong> <MathText>n</MathText> 成立。
            </p>
          </div>
          <CompleteButton
            done={completed.includes("induction")}
            onClick={() => markComplete("induction")}
          />
        </section>

        <section className="learning-section" id="proof">
          <SectionHeading
            number="04"
            title="亲手完成一次证明"
            english="PROOF, STEP BY STEP"
          >
            从定义命题到写下结论，沿着五个步骤，把直觉变成严谨的证明。
          </SectionHeading>
          <ProofExplorer onComplete={() => markComplete("proof", false)} />
          <CompleteButton
            done={completed.includes("proof")}
            last
            onClick={() => markComplete("proof")}
          />
        </section>

        <section className="learning-section practice-section" id="practice">
          <SectionHeading
            number="↗"
            title="停一下，检验你的理解"
            english="A MOMENT TO PRACTICE"
          >
            三道小题，把刚刚的发现变成自己的知识。
          </SectionHeading>
          <Practice
            onFinish={(score) => {
              setBestScore((previous) => Math.max(previous ?? 0, score));
              setLastStudy(new Date().toISOString());
            }}
          />
        </section>
        <footer className="page-footer">
          <div>
            <Brand compact />
            <span>把复杂留给数学，把清晰留给你。</span>
          </div>
          <button
            className="text-button muted"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "instant" : "smooth",
              })
            }
          >
            回到顶部
            <ArrowUpRight size={14} />
          </button>
        </footer>
      </main>

      {drawer && (
        <Drawer
          title={
            drawer === "saved"
              ? "我的收藏"
              : drawer === "history"
                ? "学习记录"
                : "本章目录"
          }
          subtitle={
            drawer === "saved"
              ? "把值得再读的内容，留在触手可及的地方。"
              : drawer === "history"
                ? "每一个小小的进步，都有迹可循。"
                : "无需按顺序，跟随你的好奇心。"
          }
          onClose={() => setDrawer(null)}
        >
          {drawer === "contents" && (
            <>
              {chapterNavigation}
              <button
                className="drawer-practice text-button"
                onClick={() => navigate("practice")}
              >
                <FlaskConical size={17} /> 前往随堂练习
                <ArrowRight size={15} />
              </button>
              <div className="mobile-space-links">
                <button onClick={() => setDrawer("saved")}>
                  <Bookmark size={16} /> 我的收藏
                  <ChevronRight size={14} />
                </button>
                <button onClick={() => setDrawer("history")}>
                  <History size={16} /> 学习记录
                  <ChevronRight size={14} />
                </button>
              </div>
            </>
          )}
          {drawer === "saved" &&
            (bookmarked ? (
              <div className="saved-chapter">
                <div className="saved-chapter-label">
                  <span>CHAPTER 01 · 代数与证明</span>
                  <button
                    className="icon-button"
                    onClick={toggleBookmark}
                    aria-label="取消收藏"
                  >
                    <Bookmark size={17} fill="currentColor" />
                  </button>
                </div>
                <h3>
                  求和记号与
                  <br />
                  数学归纳法
                </h3>
                <p>很多项的和，一步步的证明。</p>
                <button
                  className="primary-button small"
                  onClick={() => navigate("notation")}
                >
                  继续阅读
                  <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <Bookmark size={35} strokeWidth={1.3} />
                <h3>给好知识留个位置。</h3>
                <p>点击「收藏本章」，下次就能在这里找到它。</p>
                <button
                  className="primary-button small"
                  onClick={toggleBookmark}
                >
                  <Plus size={14} /> 收藏这一章
                </button>
              </div>
            ))}
          {drawer === "history" && (
            <>
              <div className="record-overview">
                <span className="step-eyebrow">CHAPTER 01 / YOUR PROGRESS</span>
                <h3>
                  {progress === 4 ? "又多了一份理解。" : "你正在一点点向前。"}
                </h3>
                <div className="record-progress">
                  <strong>
                    {progress}
                    <span> / 4 节</span>
                  </strong>
                  <div className="progress-track">
                    <span style={{ width: `${progress * 25}%` }} />
                  </div>
                </div>
              </div>
              <div className="record-chapters">
                {chapters.map((chapter) => (
                  <button key={chapter.id} onClick={() => navigate(chapter.id)}>
                    <span
                      className={`record-check ${completed.includes(chapter.id) ? "done" : ""}`}
                    >
                      {completed.includes(chapter.id) ? (
                        <Check size={14} />
                      ) : (
                        chapter.number
                      )}
                    </span>
                    <span>{chapter.title}</span>
                    <span className="record-status">
                      {completed.includes(chapter.id) ? "已掌握" : "继续探索"}
                    </span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
              <button
                className="record-quiz"
                onClick={() => navigate("practice")}
              >
                <FlaskConical size={21} />
                <span>
                  <strong>随堂练习</strong>
                  <span>
                    {bestScore === null
                      ? "还没开始，去试试看"
                      : `最佳成绩：${bestScore} / 3 题`}
                  </span>
                </span>
                <ArrowUpRight size={17} />
              </button>
              {lastStudy && (
                <p className="last-study">
                  <Clock3 size={13} /> 最近学习：
                  {new Date(lastStudy).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </>
          )}
        </Drawer>
      )}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <Check size={16} />
            <span>{toast}</span>
            <button onClick={() => setToast("")} aria-label="关闭提示">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
