/** Lessons with figure galleries: every mentioned shape is drawn. Targets the dev server. */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";
const TOPICS = ["MATH_GEO_AREA_BASIC", "MATH_GEO_VOLUME", "MATH_DATA_PROB", "MATH_GEO_PYTH"];
const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-lesson-${name}.png`, fullPage: true });
};

test("lessons show figure galleries", async ({ page }) => {
  test.setTimeout(120_000);
  await createProfile(page, "Figuren");
  for (const t of TOPICS) {
    await page.goto(`${DEV}/#/topic/${t}`);
    await page.getByRole("heading", { level: 2 }).first().waitFor();
    expect(await page.locator("article svg").count()).toBeGreaterThan(0);
    await shot(page, t);
  }
});
