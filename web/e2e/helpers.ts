import type { Page } from "@playwright/test";

export const DEV = "http://127.0.0.1:5173";

/** Close the first-run welcome tour if it is showing (it overlays the dashboard for new profiles). */
export async function dismissTour(page: Page): Promise<void> {
  const close = page.getByRole("button", { name: /Tour schließen|Überspringen/ }).first();
  if (await close.isVisible().catch(() => false)) {
    await close.click();
    await page.waitForTimeout(200);
  }
}

/** Create a fresh profile on the start page and land on the dashboard with no overlay open. */
export async function createProfile(page: Page, name: string, base = DEV): Promise<void> {
  await page.goto(`${base}/#/`);
  await page.getByPlaceholder("z. B. Lea").fill(name);
  await page.getByRole("button", { name: "Los geht's" }).click();
  await page.getByText("Deine Themen").waitFor();
  await dismissTour(page);
}
