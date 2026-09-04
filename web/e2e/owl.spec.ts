/**
 * "Frag Ferdinand": ladder index, chalkboard walkthrough, quiz, done state, and the
 * owl badges inside a lesson. Targets the running dev server like preview.spec.ts.
 */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";
const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(700); // chalk-write animation
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-owl-${name}.png`, fullPage: true });
};

test("Ferdinand chalkboard flow", async ({ page }) => {
  test.setTimeout(180_000);
  await createProfile(page, "Eule");
  await expect(page.getByRole("link", { name: /Frag Ferdinand/ })).toBeVisible();

  await page.goto(`${DEV}/#/eule`);
  await expect(page.getByText("Ganz vorn anfangen")).toBeVisible();
  await shot(page, "1-index");

  await page.goto(`${DEV}/#/eule/P_MATH_ZEICHEN`);
  await expect(page.getByText("Die Zeichen der Mathematik").first()).toBeVisible();
  await shot(page, "2-intro");

  const next = () => page.getByRole("button", { name: /Los geht's|Weiter|Zu den Wörtern|Zum Quiz|Nächste Frage|Auswertung/ });
  await next().click(); // → board 1
  await expect(page.getByText("Tafel 1 von")).toBeVisible();
  await shot(page, "3-board1");
  for (let i = 0; i < 7; i++) {
    await next().click();
    await page.waitForTimeout(350);
  }
  await expect(page.getByText("Tafel 8 von")).toBeVisible();
  await shot(page, "4-board8-figure");
  // keyboard: ArrowLeft goes back one board
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(400);
  await expect(page.getByText("Tafel 7 von")).toBeVisible();
  // run to the vocabulary
  for (let i = 0; i < 20; i++) {
    if (await page.getByRole("heading", { name: "Die Wörter" }).isVisible().catch(() => false)) break;
    await next().click();
    await page.waitForTimeout(350);
  }
  await expect(page.getByRole("heading", { name: "Die Wörter" })).toBeVisible();
  await shot(page, "5-vocab");

  await next().click();
  await expect(page.getByText(/Frage 1 von/)).toBeVisible();
  await shot(page, "6-quiz");
  // answer every question with choice 1 via keyboard, screenshot the first feedback
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("1");
    await page.waitForTimeout(300);
    if (i === 0) await shot(page, "7-quiz-feedback");
    await next().click();
    await page.waitForTimeout(400);
  }
  await expect(page.getByText(/von 6 richtig/)).toBeVisible();
  await shot(page, "8-done");

  // Lesson page shows the owl card and inline badges
  await page.goto(`${DEV}/#/topic/MATH_ALG_EQU_LINEAR`);
  await expect(page.getByText("Grundlagen zuerst")).toBeVisible();
  await expect(page.getByText(/Zu schwer\? Frag Ferdinand/).first()).toBeVisible();
  await shot(page, "9-lesson-badges");
});
