/**
 * Exam mode (Prüfungs-Modus): Basisaufgaben first and without calculator, visible stopwatch,
 * per-task summary on the result page. Targets the running dev server like preview.spec.ts.
 */
import { expect, test } from "@playwright/test";

const DEV = "http://127.0.0.1:5173";

test("exam mode: Basisaufgaben first, no calculator, per-task summary", async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto(`${DEV}/#/`);
  await page.getByPlaceholder("z. B. Lea").fill("Exam");
  await page.getByRole("button", { name: "Los geht's" }).click();
  await page.getByText("Deine Themen").waitFor();

  await page.goto(`${DEV}/#/session/MSA/MATH`);
  await expect(page.getByText(/Prüfungs-Modus · Mathe/)).toBeVisible();
  // The first 40 % of an exam run are Basisaufgaben (Teil 1, hilfsmittelfrei).
  await expect(page.getByText("ohne Taschenrechner")).toBeVisible();
  await expect(page.getByRole("button", { name: "Taschenrechner" })).toBeDisabled();
  await page.waitForTimeout(1500);
  await expect(page.getByLabel("Verstrichene Zeit")).toContainText(/0:0[1-9]/);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-10-exam-question.png`, fullPage: true });

  for (let i = 0; i < 12; i++) {
    const radio = page.getByRole("radio").first();
    if (await radio.isVisible().catch(() => false)) {
      await radio.click();
    } else {
      const input = page.getByLabel("Antwort").first();
      if (!(await input.isVisible().catch(() => false))) break;
      await input.fill("1");
    }
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await page.getByRole("button", { name: /Weiter/ }).click();
    if (await page.getByText("Deine Aufgaben").isVisible().catch(() => false)) break;
  }

  await expect(page.getByText("Deine Aufgaben")).toBeVisible();
  await expect(page.getByText(/pro Aufgabe/)).toBeVisible();
  await expect(page.getByText(/MSA Berlin 202[345]/).first()).toBeVisible();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-11-exam-result.png`, fullPage: true });
});
