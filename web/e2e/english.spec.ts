/** Englisch: tenses lesson with owl card, a drill session, and the verb-forms primer. */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";
const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-en-${name}.png`, fullPage: true });
};

test("English lesson, drill and primer", async ({ page }) => {
  test.setTimeout(120_000);
  await createProfile(page, "English");

  await page.goto(`${DEV}/#/topic/EN_USE_TENSES`);
  await expect(page.getByRole("heading", { name: /Tenses/ }).first()).toBeVisible();
  await expect(page.getByText("Grundlagen zuerst")).toBeVisible();
  await shot(page, "1-lesson-tenses");

  await page.getByRole("button", { name: /Jetzt üben/ }).click();
  await expect(page.getByText(/Thema üben · Englisch/)).toBeVisible();
  for (let i = 0; i < 3; i++) {
    const select = page.getByRole("combobox").first();
    const radio = page.getByRole("radio").first();
    const input = page.getByLabel(/Lücke 1/).first();
    if (await select.isVisible().catch(() => false)) await select.selectOption({ index: 1 });
    else if (await radio.isVisible().catch(() => false)) await radio.click();
    else if (await input.isVisible().catch(() => false)) await input.fill("went");
    else break;
    if (i === 0) await shot(page, "2-drill");
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await expect(page.getByText(/Richtig!|Leider nicht richtig/)).toBeVisible();
    if (i === 0) await shot(page, "3-feedback");
    await page.getByRole("button", { name: /Weiter/ }).click();
    await page.waitForTimeout(300);
  }

  await page.goto(`${DEV}/#/topic/EN_READ_CORE`);
  await expect(page.getByRole("heading", { name: /Listening und Reading/ })).toBeVisible();
  await shot(page, "4-lesson-reading");

  await page.goto(`${DEV}/#/eule/P_EN_VERBFORMEN`);
  await expect(page.getByText("Verbformen von Anfang an").first()).toBeVisible();
  await shot(page, "5-primer");
});
