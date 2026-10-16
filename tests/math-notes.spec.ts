import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders the complete notebook without runtime or formula errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await expect(page).toHaveTitle("知序 | 求和记号与数学归纳法");
  await expect(page.locator("h1")).toContainText("数学归纳法");
  await expect(page.locator(".learning-section")).toHaveCount(5);
  await expect(page.locator(".dynamic-sum annotation")).toHaveText(
    String.raw`\sum_{r=2}^{6}r`,
  );
  await expect(page.locator(".sum-total")).toHaveText("20");
  await expect(page.locator(".katex-error")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("explores each clickable component of summation notation", async ({
  page,
}) => {
  for (const [label, title] of [
    ["上限 n", "上限"],
    ["下限 m", "下限"],
    ["求和变量 r", "求和变量"],
    ["通用项 b_r", "通用项"],
  ]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    await expect(page.locator(".part-description h3")).toHaveText(title);
    await expect(
      page.getByRole("button", { name: label, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  }
});

test("calculates live sums, preserves dummy variables, and clamps bounds", async ({
  page,
}) => {
  await page.locator(".segmented-control button").nth(1).click();
  await expect(page.locator(".sum-total")).toHaveText("90");
  await page.getByRole("button", { name: "换个变量试试" }).click();
  await expect(page.locator(".dynamic-sum annotation")).toHaveText(
    String.raw`\sum_{i=2}^{6}i^2`,
  );
  await expect(page.locator(".sum-total")).toHaveText("90");
  await page.locator(".segmented-control button").nth(2).click();
  await expect(page.locator(".sum-total")).toHaveText("45");
  await expect(page.locator(".dynamic-sum annotation")).toHaveText(
    String.raw`\sum_{i=2}^{6}\left(2i+1\right)`,
  );
  await page
    .getByRole("button", { name: "查看 i 等于 3 时的项", exact: true })
    .click();
  await expect(page.locator(".playground-bottom annotation").last()).toHaveText(
    String.raw`2\cdot3+1=7`,
  );
  await page.getByRole("slider", { name: "求和下限" }).focus();
  await page.keyboard.press("End");
  await expect(page.getByRole("slider", { name: "求和下限" })).toHaveValue("8");
  await expect(page.getByRole("slider", { name: "求和上限" })).toHaveValue("8");
  await expect(page.locator(".sum-total")).toHaveText("17");
  await page.getByRole("slider", { name: "求和上限" }).focus();
  await page.keyboard.press("Home");
  await expect(page.getByRole("slider", { name: "求和下限" })).toHaveValue("1");
  await expect(page.getByRole("slider", { name: "求和上限" })).toHaveValue("1");
  await expect(page.locator(".sum-total")).toHaveText("3");
});

test("opens all four summation rules and changes the constant", async ({
  page,
}) => {
  await page.getByRole("button", { name: "增大常数" }).click();
  await expect(
    page.locator(".constant-experiment annotation").last(),
  ).toHaveText(String.raw`\quad\sum_{r=2}^{6}4=4\times5=20`);
  for (let i = 1; i < 4; i += 1) {
    await page.locator(".rule-trigger").nth(i).click();
    await expect(page.locator(".rule-trigger").nth(i)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(page.locator(`#rule-content-${i}`)).toBeVisible();
    await expect(page.locator(".katex-error")).toHaveCount(0);
  }
});

test("demonstrates why both induction conditions are necessary", async ({
  page,
}) => {
  await page.locator(".lab-play").click();
  await expect(page.locator(".domino-block.fallen")).toHaveCount(7);
  await expect(page.locator(".lab-play")).toBeEnabled();
  await page.getByRole("switch").nth(1).click();
  await page.locator(".lab-play").click();
  await expect(page.locator(".domino-block.fallen")).toHaveCount(1);
  await expect(page.locator(".lab-feedback")).toContainText("缺少归纳步");
  await page.getByRole("switch").nth(0).click();
  await page.locator(".lab-play").click();
  await expect(page.locator(".domino-block.fallen")).toHaveCount(0);
  await expect(page.locator(".lab-feedback")).toContainText("没有基底步");
  await page.getByRole("button", { name: "重置骨牌实验" }).click();
  await expect(page.locator(".lab-feedback")).toContainText("两步缺一不可");
});

test("walks all three examples through five complete proof steps", async ({
  page,
}) => {
  const titles = ["定义命题", "验证基础", "归纳假设", "归纳递推", "得出结论"];
  for (let example = 0; example < 3; example += 1) {
    await page.locator(".proof-example-tabs button").nth(example).click();
    for (let step = 0; step < 5; step += 1) {
      await page.locator(".proof-step-nav button").nth(step).click();
      await expect(page.locator(".proof-current-step h3")).toHaveText(
        titles[step],
      );
      await expect(page.locator(".katex-error")).toHaveCount(0);
    }
  }
  await page.getByRole("button", { name: "完成证明", exact: true }).click();
  await expect(page.locator(".proof-footer")).toContainText(
    "你已完成一次严谨的归纳证明",
  );
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("zhixu-completed") ?? "[]"),
    ),
  ).toContain("proof");
  await page.reload();
  await expect(page.locator(".progress-heading strong")).toContainText("1");
});

test("grades the quiz, explains answers, and saves the best score", async ({
  page,
}) => {
  for (const [index, answer] of [1, 2, 3].entries()) {
    await expect(page.locator(".quiz-topline>span").last()).toContainText(
      `0${index + 1}`,
    );
    await expect(
      page.getByRole("button", { name: "确认答案", exact: true }),
    ).toBeDisabled();
    await page.locator(".quiz-option").nth(answer).click();
    await page.getByRole("button", { name: "确认答案", exact: true }).click();
    await expect(page.locator(".quiz-feedback")).toContainText("答对了");
    await page
      .getByRole("button", {
        name: index === 2 ? "查看结果" : "下一题",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".quiz-summary")).toContainText("3 / 3");
  expect(
    await page.evaluate(() => localStorage.getItem("zhixu-best-score")),
  ).toBe("3");
  await page.getByRole("button", { name: "再练一次", exact: true }).click();
  await page.locator(".quiz-option").nth(0).click();
  await page.getByRole("button", { name: "确认答案", exact: true }).click();
  await expect(page.locator(".quiz-feedback")).toContainText("9 - 3 + 1 = 7");
  await expect(page.locator(".quiz-option.correct")).toHaveCount(1);
  await expect(page.locator(".quiz-option.incorrect")).toHaveCount(1);
});

test("saves bookmarks, opens records, and supports keyboard dismissal and focus mode", async ({
  page,
}) => {
  await page.getByRole("button", { name: "收藏本章", exact: true }).click();
  await page.getByRole("button", { name: "我的收藏", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "我的收藏" })).toBeVisible();
  await expect(page.locator(".saved-chapter")).toContainText("数学归纳法");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "已收藏", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "学习记录", exact: true }).click();
  await expect(page.locator(".record-chapters>button")).toHaveCount(4);
  await page.getByRole("button", { name: "关闭面板" }).click();
  await page.getByRole("button", { name: "进入专注模式" }).click();
  await expect(page.locator(".app")).toHaveClass(/focus-mode/);
  await page.getByRole("button", { name: "退出专注模式" }).click();
  await expect(page.locator(".app")).not.toHaveClass(/focus-mode/);
});

test("exports a self-contained HTML with offline formulas and working sliders", async ({
  page,
}, testInfo) => {
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "导出笔记", exact: true }).click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toContain(".html");
  const path = testInfo.outputPath("notes.html");
  await download.saveAs(path);
  await page.goto(`file://${path}`);
  await expect(page.locator("h1")).toHaveText("求和记号与数学归纳法");
  expect(await page.locator("math").count()).toBeGreaterThan(20);
  await expect(page.locator("#sum-result")).toHaveText(
    "2 + 3 + 4 + 5 + 6 = 20",
  );
  await page.locator("#lower").focus();
  await page.keyboard.press("End");
  await expect(page.locator("#sum-result")).toHaveText("8 = 8");
  await expect(page.locator("details")).toHaveCount(19);
});

test("adapts without horizontal overflow at phone, tablet, and desktop widths", async ({
  page,
}) => {
  for (const width of [360, 390, 620, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.locator(".proof-example-tabs button").nth(2).click();
    await page.locator(".proof-step-nav button").nth(3).click();
    await expect(page.locator(".proof-current-step h3")).toHaveText("归纳递推");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("supports touch navigation and swiping through proof steps", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await page.getByRole("button", { name: "打开章节目录" }).tap();
  await page.getByRole("button", { name: "学习记录", exact: true }).tap();
  await expect(page.getByRole("dialog", { name: "学习记录" })).toBeVisible();
  await page.getByRole("button", { name: "关闭面板" }).tap();
  await page.locator(".mobile-chapter-strip button").nth(3).tap();
  await expect(page.locator(".proof-current-step h3")).toHaveText("定义命题");
  await page.locator(".proof-step-content").scrollIntoViewIfNeeded();
  const box = await page.locator(".proof-step-content").boundingBox();
  expect(box).not.toBeNull();
  if (box) {
    const cdp = await context.newCDPSession(page);
    const y = box.y + 80;
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: 320, y }],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 150, y }],
    });
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await expect(page.locator(".proof-current-step h3")).toHaveText("验证基础");
  }
  await context.close();
});
