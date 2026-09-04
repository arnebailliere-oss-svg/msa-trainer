/** Visual check of content-sprint items: question previews and primer boards (screenshots, render assertions only). */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

const list = (env: string | undefined) => (env ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const IDS = list(process.env.PREVIEW_IDS);
const PRIMERS = list(process.env.PRIMER_IDS);

const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(700);
  await page.screenshot({ path: `e2e/screenshots/sprint-${name}.png`, fullPage: true });
};

for (const id of IDS) {
  test(`preview ${id}`, async ({ page }) => {
    await page.goto(`${DEV}/#/preview/${id}`);
    await expect(page.getByText(id)).toBeVisible();
    await shot(page, id);
  });
}

for (const id of PRIMERS) {
  test(`primer ${id}`, async ({ page }) => {
    test.setTimeout(120_000);
    await createProfile(page, "Sprint");
    await page.goto(`${DEV}/#/eule/${id}`);
    const next = () => page.getByRole("button", { name: /Los geht's|Weiter|Zu den Wörtern|Zum Quiz|Nächste Frage|Auswertung/ });
    await shot(page, `${id}-intro`);
    await next().click();
    await expect(page.getByText("Tafel 1 von")).toBeVisible();
    await shot(page, `${id}-board1`);
    for (let i = 0; i < 3; i++) {
      await next().click();
      await page.waitForTimeout(350);
    }
    await shot(page, `${id}-board4`);
    for (let i = 0; i < 25; i++) {
      if (await page.getByRole("heading", { name: "Die Wörter" }).isVisible().catch(() => false)) break;
      await next().click();
      await page.waitForTimeout(300);
    }
    await shot(page, `${id}-vocab`);
    await next().click();
    await expect(page.getByText(/Frage 1 von/)).toBeVisible();
    await shot(page, `${id}-quiz`);
  });
}
