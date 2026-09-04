import type { Page } from "@playwright/test";

export const DEV = "http://127.0.0.1:5173";

/**
 * Close the first-run welcome tour if it is showing (it overlays the dashboard for new profiles).
 * Escape, not a click: the emulated phone zooms the dashboard out (see E4-20), which makes
 * Playwright's hit-testing miss buttons inside fixed overlays.
 */
export async function dismissTour(page: Page): Promise<void> {
  const dialog = page.getByRole("dialog");
  if (await dialog.isVisible().catch(() => false)) {
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
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
