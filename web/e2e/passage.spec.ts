/** Reading passages: shown once above the question (preview) and kept together in an English exam run. */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(500);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-passage-${name}.png`, fullPage: true });
};

test("passage panel in preview and English exam run", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto(`${DEV}/#/preview/EN_MSA2024_R3_17`);
  await expect(page.getByText("The business of voluntourism")).toBeVisible();
  await expect(page.getByText(/Why do many people volunteer/)).toBeVisible();
  await shot(page, "1-preview");

  await createProfile(page, "Passage");
  await page.goto(`${DEV}/#/session/MSA/EN`);
  await expect(page.getByText(/Prüfungs-Modus · Englisch/)).toBeVisible();
  await shot(page, "2-exam-en");
});
