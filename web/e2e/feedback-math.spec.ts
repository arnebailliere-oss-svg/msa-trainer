/**
 * The feedback after a wrong answer shows formulas as formulas, never as raw text with dollar signs.
 * Targets the dev server.
 */
import { expect, test } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

test("the correct answer in the feedback is rendered maths, not dollar signs", async ({ page }) => {
  await createProfile(page, "Formel");
  await page.goto(`${DEV}/#/topic/MATH_FUNC_LINEAR_FORM`);
  await page.getByRole("button", { name: /Jetzt üben/ }).click();
  await expect(page.getByText(/Thema üben/)).toBeVisible();

  let formulaAnswers = 0;
  for (let i = 0; i < 16 && formulaAnswers < 2; i++) {
    const radios = page.getByRole("radio");
    if ((await radios.count()) > 0) await radios.first().click();
    else if (await page.getByLabel("Antwort").isVisible().catch(() => false)) await page.getByLabel("Antwort").fill("0");
    const check = page.getByRole("button", { name: "Antwort prüfen" });
    if (!(await check.isVisible().catch(() => false))) break;
    await check.click().catch(() => {});
    const line = page.getByText("Richtige Antwort:");
    if (await line.isVisible().catch(() => false)) {
      await expect(line).not.toContainText("$");
      if ((await line.locator(".katex").count()) > 0) formulaAnswers++;
    }
    const next = page.getByRole("button", { name: /Weiter|Ergebnis/ });
    if (!(await next.isVisible().catch(() => false))) break;
    await next.click();
  }
  expect(formulaAnswers, "no wrong answer with a formula came up; pick another topic").toBeGreaterThan(0);
});
