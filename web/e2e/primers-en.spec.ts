/**
 * Every Eulen-Lektion of a subject runs end to end: all boards render (including the pause
 * boards between chapters), nothing overflows sideways, the quiz can be answered and the lesson
 * completes. The list of lessons comes from the built content, so new lessons are covered
 * automatically. Targets the dev server. PRIMER_SUBJECT=DE|MATH|EN (default EN).
 */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

const SUBJECT = process.env.PRIMER_SUBJECT ?? "EN";

async function runPrimer(page: Page, id: string, boards: number) {
  await page.goto(`${DEV}/#/eule/${id}`);
  await expect(page.getByText(new RegExp(`${boards} Tafeln`))).toBeVisible();
  await page.getByRole("button", { name: /Los geht's/ }).first().click();
  let seen = 0;
  for (let i = 0; i < boards * 2 + 5; i++) {
    await page.waitForTimeout(330); // wipe animation
    if (await page.getByRole("heading", { name: "Die Wörter" }).isVisible().catch(() => false)) break;
    if (await page.getByText(new RegExp(`Tafel \\d+ von ${boards}`)).isVisible().catch(() => false)) {
      seen++;
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${id}: board ${seen} overflows sideways`).toBeLessThanOrEqual(1);
    }
    await page.keyboard.press("Enter");
  }
  expect(seen, `${id}: boards seen`).toBe(boards);
  await expect(page.getByRole("heading", { name: "Die Wörter" })).toBeVisible();
  await page.keyboard.press("Enter");
  for (let q = 0; q < 20; q++) {
    await page.waitForTimeout(330);
    if (await page.getByText(/Geschafft!|Fast!/).isVisible().catch(() => false)) break;
    await page.keyboard.press("1");
    await page.waitForTimeout(120);
    await page.keyboard.press("Enter");
  }
  await expect(page.getByText(/Geschafft!|Fast!/)).toBeVisible();
}

test(`${SUBJECT} Eulen-Lektionen run end to end`, async ({ page, request }) => {
  test.setTimeout(900_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const pack = (await (await request.get(`${DEV}/content/${SUBJECT}.json`)).json()) as { primers: { id: string; steps: unknown[] }[] };
  expect(pack.primers.length).toBeGreaterThan(0);
  await createProfile(page, "Primers");
  for (const p of pack.primers) await runPrimer(page, p.id, p.steps.length);
  expect(errors).toEqual([]);
});
