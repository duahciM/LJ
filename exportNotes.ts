import katex from "katex";
import { examples, proofSteps, rules } from "./content";

export function exportNotes() {
  const math = (tex: string) =>
    katex.renderToString(tex, {
      output: "mathml",
      displayMode: true,
      throwOnError: false,
    });
  const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>知序 | 求和记号与数学归纳法</title><style>
  *{box-sizing:border-box}body{font:16px/1.9 system-ui,sans-serif;color:#26382d;background:#fafbf7;margin:0}main{max-width:850px;margin:auto;padding:48px 24px}h1{font-size:36px;line-height:1.5}h2{margin-top:56px;border-top:1px solid #dce2d9;padding-top:24px}h3{margin-top:28px}p{color:#5b675d}math{font-size:1.2em;margin:28px 0;max-width:100%;overflow:auto}summary{cursor:pointer;padding:12px 0;font-weight:600}details{border-bottom:1px solid #dce2d9}button{padding:10px 20px;border:0;border-radius:6px;background:#385b43;color:white;cursor:pointer}label{display:block;margin:16px 0}input{accent-color:#385b43;width:220px;max-width:65%}.experiment{padding:24px;background:#edf2e8;border-radius:8px}#sum-result{font-size:23px;font-weight:600}footer{margin-top:56px;font-size:13px;color:#7d887e}@media print{button{display:none}details{display:block}details>*{display:block!important}body{background:white}}
  </style></head><body><main><small>知序 ZHIXU / 交互数学笔记 / LESSON 01</small><h1>求和记号与数学归纳法</h1><p>把零散的项连成整体，让一个结论走向无穷。</p><button onclick="document.querySelectorAll('details').forEach(d=>d.open=true);window.print()">打印笔记</button>
  <h2>01 / 求和记号</h2>${math(String.raw`\sum_{r=m}^{n}b_r`)}<p>Σ 读作 sigma，表示求和。bᵣ 是通用项，r 是求和变量（也叫哑变量），m 是下限，n 是上限。m、n 为整数，且 n ≥ m。总项数为 n - m + 1。变量也可以换成 i、j 或 k，结果不变。</p>${math(String.raw`\sum_{r=m}^{n}a_r=a_m+a_{m+1}+\cdots+a_n`)}${math(String.raw`\sum_{r=2}^{6}c_r=c_2+c_3+c_4+c_5+c_6`)}
  <div class="experiment"><h3>动手试试：自然数求和</h3><label>下限 m：<input id="lower" type="range" min="1" max="8" value="2"><span id="m">2</span></label><label>上限 n：<input id="upper" type="range" min="1" max="12" value="6"><span id="n">6</span></label><div id="sum-result"></div></div>
  <h2>02 / 求和运算法则</h2><p>其中 aᵣ、bᵣ 为序列，c、p、q 为常数。</p>${rules.map((r) => `<details open><summary>${r.title}</summary><p>${r.description}</p>${math(r.formula)}${math(r.detail)}</details>`).join("")}
  <h2>03 / 数学归纳法</h2><p>能明确判断为真或为假的陈述句称为命题。验证很多个正整数，并不能替代对所有正整数的证明。</p><h3>第一步：基底步</h3><p>验证 P(1) 为真。</p><h3>第二步：归纳步</h3><p>对任意正整数 k，假设 P(k) 为真，并由此证明 P(k+1) 为真。</p><p>当两步都成立，P(n) 就对所有正整数 n 成立。</p>
  <h2>04 / 归纳法证明</h2><p>点击标题展开各个步骤。</p>${examples.map((ex) => `<h3>${ex.name}</h3>${math(ex.formula)}${proofSteps.map((s, i) => `<details${i === 0 ? " open" : ""}><summary>Step ${i + 1} / ${s.title}</summary>${i === 0 ? `<p>定义关于正整数 n 的命题 P(n)：</p>${math(ex.formula)}` : i === 1 ? `${math(ex.base)}<p>左右两边相等，故 P(1) 成立。</p>` : i === 2 ? `<p>假设 n = k 时命题成立，其中 k 是任意正整数：</p>${math(ex.assumption)}` : i === 3 ? `<p>拆出第 k+1 项，用归纳假设替换前 k 项，再化简：</p>${math(ex.derivation)}<p>所得结果正是右边代入 k+1 的形式，因此 P(k+1) 成立。</p>` : `<p>由于 P(1) 成立，且 P(k) 成立能推出 P(k+1) 成立，根据数学归纳法，P(n) 对所有正整数 n 均成立。</p>`}</details>`).join("")}`).join("")}
  <footer>知序 / 把复杂留给数学，把清晰留给你。此 HTML 可离线阅读、交互及打印。</footer></main><script>
  const lo=document.getElementById('lower'),hi=document.getElementById('upper');function update(e){let m=+lo.value,n=+hi.value;if(m>n){if(e&&e.target===lo)hi.value=m;else lo.value=n;m=+lo.value;n=+hi.value}document.getElementById('m').textContent=m;document.getElementById('n').textContent=n;const terms=Array.from({length:n-m+1},(_,i)=>m+i);document.getElementById('sum-result').textContent=terms.join(' + ')+' = '+terms.reduce((a,b)=>a+b,0)}lo.oninput=update;hi.oninput=update;update();
  </script></body></html>`;
  const url = URL.createObjectURL(
    new Blob([html], { type: "text/html;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "zhixu-math-notes.html";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
