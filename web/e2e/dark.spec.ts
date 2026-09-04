import { test } from "@playwright/test";
import { dismissTour } from "./helpers";

/** Visual check of the dark palette (screenshots only, no assertions beyond navigation). */
test("dark mode screenshots", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/#/");
  await page.getByPlaceholder("z. B. Lea").fill("Dark");
  await page.getByRole("button", { name: "Los geht's" }).click();
  await page.getByText("Deine Themen").waitFor();
  await dismissTour(page);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-10-dark-dashboard.png` });
  await page.getByRole("button", { name: /Schnelltraining/ }).click();
  await page.getByRole("button", { name: "Antwort prüfen" }).waitFor();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-11-dark-question.png` });
  const radio = page.getByRole("radio").first();
  if (await radio.isVisible().catch(() => false)) await radio.click();
  else await page.getByLabel("Antwort").fill("1");
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await page.getByRole("button", { name: /Weiter/ }).waitFor();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-12-dark-feedback.png`, fullPage: true });
});
