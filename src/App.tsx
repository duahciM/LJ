import TeX from "./components/TeX";
import Reveal from "./components/Reveal";
import SigmaAnatomy from "./components/SigmaAnatomy";
import SumExpander from "./components/SumExpander";
import RuleCards from "./components/RuleCards";
import Dominoes from "./components/Dominoes";
import ProofSteps from "./components/ProofSteps";

const NAV = [
  { id: "notation", no: "01", label: "求和记号" },
  { id: "rules", no: "02", label: "运算法则" },
  { id: "induction", no: "03", label: "归纳法原理" },
  { id: "proof", no: "04", label: "五步证明" },
];

function SectionHead({
  no,
  zh,
  en,
}: {
  no: string;
  zh: string;
  en: string;
}) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-5 border-b border-[var(--ink)] pb-5">
        <span className="text-sm tabular-nums text-[var(--ink-faint)]">{no}</span>
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{zh}</h2>
          <p className="mt-1 text-xs tracking-[0.18em] uppercase text-[var(--ink-faint)]">
            {en}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function App() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 -mx-5 border-b border-[var(--line)] bg-[var(--paper)]/95 px-5 backdrop-blur sm:-mx-8 sm:px-8">
        <nav className="mx-auto flex max-w-3xl items-center justify-between gap-2 py-3">
          <a href="#top" className="text-sm font-bold tracking-tight">
            Σ&ensp;学习笔记
          </a>
          <div className="flex gap-1 overflow-x-auto">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="tappable whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-[var(--ink-soft)] hover:bg-[var(--line)]"
              >
                <span className="tabular-nums text-[var(--ink-faint)]">
                  {item.no}&thinsp;
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* 封面 —— 强调色在全站仅出现这一次 */}
      <section id="top" className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <Reveal>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--ink-faint)]">
            Mathematics · Study Notes
          </p>
          <div
            className="mt-6 text-[9rem] leading-none font-light sm:text-[13rem]"
            style={{ color: "var(--accent)", fontFamily: "Georgia, serif" }}
            aria-hidden
          >
            Σ
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
            求和记号
            <br />
            与数学归纳法
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-[var(--ink-soft)]">
            Summation Notation &amp; Mathematical Induction。
            一份可以用手指“把公式拆开”的笔记——轻触、展开、推倒多米诺。
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--ink-soft)]">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="tappable py-1 underline decoration-[var(--line)] underline-offset-4 hover:decoration-[var(--ink)]"
              >
                <span className="tabular-nums text-[var(--ink-faint)]">
                  {item.no}
                </span>
                &ensp;{item.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 01 求和记号 */}
      <section id="notation" className="scroll-mt-20 pb-24 sm:pb-32">
        <SectionHead no="01" zh="求和记号" en="Summation Notation" />
        <Reveal className="mt-8">
          <p className="max-w-xl text-[15px] leading-7 text-[var(--ink-soft)]">
            符号 Σ 是希腊字母 sigma，意为
            <span className="font-semibold text-[var(--ink)]">“求和 the sum”</span>
            。标准形式 <TeX tex="\textstyle\sum_{r=m}^{n} b_r" />{" "}
            由四个部分组成——先认识每个零件，再看它如何展开。
          </p>
        </Reveal>
        <Reveal className="mt-8">
          <SigmaAnatomy />
        </Reveal>
        <Reveal className="mt-12">
          <h3 className="text-lg font-bold">试一试：展开一个求和</h3>
          <p className="mt-2 mb-6 max-w-xl text-[15px] leading-7 text-[var(--ink-soft)]">
            调整上下限与通用项，观察展开式、项数与结果如何变化。例如{" "}
            <TeX tex="\textstyle\sum_{r=2}^{6} c_r = c_2+c_3+c_4+c_5+c_6" />。
          </p>
          <SumExpander />
        </Reveal>
      </section>

      {/* 02 运算法则 */}
      <section id="rules" className="scroll-mt-20 pb-24 sm:pb-32">
        <SectionHead no="02" zh="运算法则" en="Properties of Summation" />
        <Reveal className="mt-8">
          <p className="max-w-xl text-[15px] leading-7 text-[var(--ink-soft)]">
            设 <TeX tex="a_1, a_2, \dots" /> 与 <TeX tex="b_1, b_2, \dots" />{" "}
            为两个序列，<TeX tex="c,\,p,\,q" /> 为常数。四条基本法则——轻触展开。
          </p>
        </Reveal>
        <Reveal className="mt-8">
          <RuleCards />
        </Reveal>
      </section>

      {/* 03 归纳法原理 */}
      <section id="induction" className="scroll-mt-20 pb-24 sm:pb-32">
        <SectionHead
          no="03"
          zh="数学归纳法原理"
          en="Principle of Mathematical Induction"
        />
        <Reveal className="mt-8">
          <div className="max-w-xl space-y-4 text-[15px] leading-7 text-[var(--ink-soft)]">
            <p>
              <span className="font-semibold text-[var(--ink)]">命题 Proposition</span>
              ：能够明确判断为真或为假的陈述句。有些命题对许多正整数都成立，
              但要证明它对<em>所有</em>正整数成立，逐一验证是不可能的——需要数学归纳法。
            </p>
            <p>
              设 P(n) 是关于正整数 n 的命题。若同时满足下面两个条件，
              则 P(n) 对<span className="font-semibold text-[var(--ink)]">所有正整数 n</span>
              均成立：
            </p>
          </div>
        </Reveal>
        <Reveal className="mt-8">
          <Dominoes />
        </Reveal>
        <Reveal className="mt-6">
          <blockquote className="border-l-2 border-[var(--ink)] pl-5 text-[15px] leading-7 text-[var(--ink-soft)]">
            基底步保证起点为真；归纳步保证真值可以无限传递。
            两者缺一不可——没有第一块倒下，链条不会启动；没有传递，倒下止于一块。
          </blockquote>
        </Reveal>
      </section>

      {/* 04 五步证明 */}
      <section id="proof" className="scroll-mt-20 pb-24 sm:pb-32">
        <SectionHead
          no="04"
          zh="五步证明流程"
          en="Proofs of Summation Propositions"
        />
        <Reveal className="mt-8">
          <p className="max-w-xl text-[15px] leading-7 text-[var(--ink-soft)]">
            证明形如 <TeX tex="\textstyle\sum_{r=1}^{n} f(r) = g(n)" />{" "}
            的有限序列求和公式，遵循标准五步。逐步轻触，跟随一个完整的证明。
          </p>
        </Reveal>
        <Reveal className="mt-8">
          <ProofSteps />
        </Reveal>
      </section>

      {/* 速查 */}
      <section className="pb-24 sm:pb-32">
        <Reveal>
          <div className="border border-[var(--ink)] px-6 py-8 sm:px-10">
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--ink-faint)]">
              合上笔记前 · 速查
            </p>
            <ul className="mt-5 space-y-3 text-[15px] leading-7">
              <li>
                — 项数永远是 <TeX tex="(n-m+1)" />，不是 <TeX tex="(n-m)" />。
              </li>
              <li>— 哑变量换字母不换结果：r、i、j、k 都一样。</li>
              <li>— 常数能提出，和差能拆开，区间能切断再拼回。</li>
              <li>— 归纳法 = 基底步 + 归纳步，最后必须写结论。</li>
              <li>
                — Step 4 的关键动作：拆出前 k 项 → 代入假设 → 因式分解成 k+1 的形式。
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-[var(--line)] py-10 text-xs leading-6 text-[var(--ink-faint)]">
        <p>求和记号与数学归纳法 · 交互式学习笔记</p>
        <p className="mt-1">
          瑞典式排印：一次强调色 · 字体先于装饰 · 动效为阅读服务 · 以排版代替素材
        </p>
      </footer>
    </div>
  );
}
