/** Nachweis-Modell: readiness ring and Tagesplan card on the dashboard, a PLAN session with level feedback. */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(500);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-plan-${name}.png`, fullPage: true });
};

test("dashboard shows Prüfungsreife and the Tagesplan runs with level feedback", async ({ page }) => {
  test.setTimeout(180_000);
  await createProfile(page, "Plan");
  await expect(page.getByTestId("readiness")).toContainText("Prüfungsreife");
  await expect(page.getByRole("button", { name: /Heute: \d+ Aufgaben/ })).toBeVisible();
  await shot(page, "1-dashboard");

  await page.getByRole("button", { name: /Heute: \d+ Aufgaben/ }).click();
  await expect(page.getByText(/Tagesplan · /)).toBeVisible();
  let answered = 0;
  for (let i = 0; i < 6; i++) {
    const selects = page.getByRole("combobox");
    const radio = page.getByRole("radio").first();
    const input = page.getByLabel(/Lücke \d|Antwort/).first();
    if ((await selects.count()) > 0) {
      for (let k = 0; k < (await selects.count()); k++) await selects.nth(k).selectOption({ index: 1 });
    } else if (await radio.isVisible().catch(() => false)) await radio.click();
    else if (await input.isVisible().catch(() => false)) await input.fill("1");
    else break;
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await expect(page.getByText(/Neu|Angefangen|Geübt|Sicher|Prüfungsfest/).first()).toBeVisible();
    answered++;
    if (i === 0) await shot(page, "2-feedback");
    await page.getByRole("button", { name: /Weiter/ }).click();
    await page.waitForTimeout(300);
  }
  expect(answered).toBeGreaterThan(0);

  await page.goto(`${DEV}/#/home`);
  await expect(page.getByText(/von \d+ gemacht|Heute geschafft/)).toBeVisible();
  await shot(page, "3-dashboard-progress");
});
