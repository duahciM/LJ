export const chapters = [
  {
    id: "notation",
    number: "01",
    title: "求和记号",
    english: "Summation notation",
  },
  {
    id: "rules",
    number: "02",
    title: "求和运算法则",
    english: "Rules of summation",
  },
  {
    id: "induction",
    number: "03",
    title: "数学归纳法",
    english: "Mathematical induction",
  },
  {
    id: "proof",
    number: "04",
    title: "归纳法证明",
    english: "Proof, step by step",
  },
];

export const parts = {
  upper: {
    name: "上限",
    english: "UPPER LIMIT",
    symbol: "n",
    description: "求和在这里结束。变量 r 取到 n 时，最后一项也被加入总和。",
    example: String.raw`\sum_{r=2}^{\color{#46735a}6} c_r = c_2 + c_3 + c_4 + c_5 + c_6`,
  },
  lower: {
    name: "下限",
    english: "LOWER LIMIT",
    symbol: "m",
    description: "求和从这里开始。变量 r 的第一个值是 m，第一项就是 b_m。",
    example: String.raw`\sum_{r=\color{#46735a}2}^{6} c_r = c_2 + c_3 + c_4 + c_5 + c_6`,
  },
  index: {
    name: "求和变量",
    english: "DUMMY VARIABLE",
    symbol: "r",
    description:
      "也叫哑变量，依次取从 m 到 n 的整数。换成 i、j 或 k，求和结果不会改变。",
    example: String.raw`\sum_{r=1}^{n} b_r = \sum_{i=1}^{n} b_i`,
  },
  term: {
    name: "通用项",
    english: "GENERAL TERM",
    symbol: "b_r",
    description:
      "它告诉我们每一项的样子。把 r 换成对应的整数，就能得到要相加的那一项。",
    example: String.raw`b_r = r^2 \quad\Longrightarrow\quad b_3 = 3^2 = 9`,
  },
};

export type PartKey = keyof typeof parts;

export const rules = [
  {
    title: "常数求和",
    english: "A constant, repeated",
    formula: String.raw`\sum_{r=m}^{n} c = c(n-m+1)`,
    description: "把同一个常数加上「总项数」次，就是常数乘以项数。",
    detail: String.raw`m=1\text{ 时，}\quad\sum_{r=1}^{n}c=cn`,
  },
  {
    title: "常数提取",
    english: "Take the constant outside",
    formula: String.raw`\sum_{r=m}^{n} ca_r = c\sum_{r=m}^{n} a_r`,
    description: "每一项都有相同的常数因子，可以先求和，再乘这个常数。",
    detail: String.raw`\sum_{r=1}^{4} 3r=3\sum_{r=1}^{4}r=3(1+2+3+4)=30`,
  },
  {
    title: "和差拆分",
    english: "Add and subtract, separately",
    formula: String.raw`\sum_{r=m}^{n}(a_r\pm b_r)=\sum_{r=m}^{n}a_r\pm\sum_{r=m}^{n}b_r`,
    description:
      "逐项相加或相减，可以拆成两个独立的求和。更一般地，求和满足线性组合。",
    detail: String.raw`\sum_{r=m}^{n}(pa_r+qb_r)=p\sum_{r=m}^{n}a_r+q\sum_{r=m}^{n}b_r`,
  },
  {
    title: "区间拼接",
    english: "Split the interval, not the terms",
    formula: String.raw`\sum_{r=m}^{s}a_r=\sum_{r=m}^{n}a_r+\sum_{r=n+1}^{s}a_r`,
    description:
      "在中间切开，再把两段接起来。注意第二段从 n+1 开始，既不重复，也不遗漏。",
    detail: String.raw`m\le n<s\quad\text{且}\quad\sum_{r=2}^{6}r=\sum_{r=2}^{4}r+\sum_{r=5}^{6}r=20`,
  },
];

export const proofSteps = [
  { title: "定义命题", english: "Define the proposition" },
  { title: "验证基础", english: "Check the base case" },
  { title: "归纳假设", english: "Make the assumption" },
  { title: "归纳递推", english: "Prove the next case" },
  { title: "得出结论", english: "Draw the conclusion" },
];

export const examples = [
  {
    name: "自然数之和",
    formula: String.raw`\sum_{r=1}^{n}r=\frac{n(n+1)}{2}`,
    assumption: String.raw`\sum_{r=1}^{k}r=\frac{k(k+1)}{2}`,
    base: String.raw`\mathrm{L.H.S.}=1,\qquad\mathrm{R.H.S.}=\frac{1(1+1)}{2}=1`,
    derivation: String.raw`\begin{aligned}\sum_{r=1}^{k+1}r&=\sum_{r=1}^{k}r+(k+1)\\[8pt]&=\frac{k(k+1)}{2}+(k+1)\\[8pt]&=\frac{(k+1)(k+2)}{2}\\[8pt]&=\frac{(k+1)((k+1)+1)}{2}\end{aligned}`,
  },
  {
    name: "奇数之和",
    formula: String.raw`\sum_{r=1}^{n}(2r-1)=n^2`,
    assumption: String.raw`\sum_{r=1}^{k}(2r-1)=k^2`,
    base: String.raw`\mathrm{L.H.S.}=2\times1-1=1,\qquad\mathrm{R.H.S.}=1^2=1`,
    derivation: String.raw`\begin{aligned}\sum_{r=1}^{k+1}(2r-1)&=\sum_{r=1}^{k}(2r-1)+(2(k+1)-1)\\[8pt]&=k^2+2k+1\\[8pt]&=(k+1)^2\end{aligned}`,
  },
  {
    name: "平方和",
    formula: String.raw`\sum_{r=1}^{n}r^2=\frac{n(n+1)(2n+1)}{6}`,
    assumption: String.raw`\sum_{r=1}^{k}r^2=\frac{k(k+1)(2k+1)}{6}`,
    base: String.raw`\mathrm{L.H.S.}=1^2=1,\qquad\mathrm{R.H.S.}=\frac{1\cdot2\cdot3}{6}=1`,
    derivation: String.raw`\begin{aligned}\sum_{r=1}^{k+1}r^2&=\frac{k(k+1)(2k+1)}{6}+(k+1)^2\\[8pt]&=\frac{(k+1)(2k^2+7k+6)}{6}\\[8pt]&=\frac{(k+1)(k+2)(2k+3)}{6}\\[8pt]&=\frac{(k+1)((k+1)+1)(2(k+1)+1)}{6}\end{aligned}`,
  },
];

export const questions = [
  {
    question: "先不计算结果，这个求和一共有多少项？",
    formula: String.raw`\sum_{r=3}^{9} r^2`,
    options: ["6 项", "7 项", "8 项", "9 项"],
    answer: 1,
    explanation: "上限减下限，再加 1：9 - 3 + 1 = 7。起点和终点都要包含在内。",
    math: false,
  },
  {
    question: "要证明命题对所有正整数成立，需要满足什么？",
    formula: String.raw`P(n),\quad n\in\mathbb{Z}^{+}`,
    options: [
      "只验证 P(1) 成立",
      "验证前 100 个正整数",
      "验证 P(1)，并由 P(k) 推出 P(k+1)",
      "只假设 P(k) 成立",
    ],
    answer: 2,
    explanation:
      "基底步保证证明有起点，归纳步保证结论能传递到下一项。两个条件缺一不可。",
    math: false,
  },
  {
    question: "使用归纳假设之前，应该怎样拆出「新的一项」？",
    formula: String.raw`\sum_{r=1}^{k+1}r^2=\;?`,
    options: [
      String.raw`\sum_{r=1}^{k}r^2+1`,
      String.raw`\sum_{r=1}^{k}r^2+k^2`,
      String.raw`\sum_{r=1}^{k}r^2+(k+1)`,
      String.raw`\sum_{r=1}^{k}r^2+(k+1)^2`,
    ],
    answer: 3,
    explanation:
      "通用项是 r²，所以 r = k+1 时，新的一项是 (k+1)²，而不是 k+1。",
    math: true,
  },
];
