/**
 * Every maths Spickzettel opens all its cards on desktop and phone: formulas render, the legend tables
 * ("Zeichen / Bedeutung") are there and nothing runs off the screen. Targets the dev server.
 */
import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

type Lesson = { id: string; topicId: string; title: string; sheet?: boolean };
const dir = path.join(process.cwd(), "..", "content_packs", "berlin_msa", "lessons");
const sheets: Lesson[] = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("math_"))
  .flatMap((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as Lesson[])
  .filter((l) => l.sheet);

test("maths Spickzettel: all cards open, legends shown, no overflow", async ({ page }) => {
  test.setTimeout(240_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await createProfile(page, "Formeln");
  expect(sheets.length).toBeGreaterThanOrEqual(12);
  for (const l of sheets) {
    await page.goto(`${DEV}/#/topic/${l.topicId}`);
    await expect(page.getByText("Spickzettel zum Nachschlagen")).toBeVisible();
    const cards = page.locator("details.sheet-card");
    const n = await cards.count();
    for (let i = 0; i < n; i++) if (!(await cards.nth(i).evaluate((d) => (d as HTMLDetailsElement).open))) await cards.nth(i).locator("summary").click();
    await expect(page.locator(".katex-error"), `${l.id}: formula failed to render`).toHaveCount(0);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(over, `${l.id}: page is wider than the screen`).toBeLessThanOrEqual(1);
    // a table may scroll inside its own box, but must not be cut off without a way to reach it
    const cut = await page.evaluate(() =>
      [...document.querySelectorAll("details.sheet-card table")].filter((t) => {
        const box = t.parentElement!;
        return t.scrollWidth > box.clientWidth + 1 && getComputedStyle(box).overflowX === "visible";
      }).length,
    );
    expect(cut, `${l.id}: a table is cut off`).toBe(0);
    if (l.id === "L_MATH_GEO_KOERPER" || l.id === "L_MATH_FORMELBLATT" || l.id === "L_MATH_GEO_FLAECHE") {
      await expect(page.getByRole("columnheader", { name: "Zeichen" }).first()).toBeVisible();
      await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-sheet-${l.id}.png`, fullPage: true });
    }
  }
  expect(errors).toEqual([]);
});
