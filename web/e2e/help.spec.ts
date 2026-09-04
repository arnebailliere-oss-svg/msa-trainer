/** Welcome tour on first start + the permanent help page #/hilfe. */
import { expect, test, type Page } from "@playwright/test";
import { dismissTour } from "./helpers";

const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(500);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-help-${name}.png`, fullPage: true });
};

test("help page is reachable without a profile", async ({ page }) => {
  await page.goto("/#/hilfe");
  await expect(page.getByRole("heading", { name: "So funktioniert der MSA Trainer" })).toBeVisible();

  // Every chapter the students were promised is there.
  for (const heading of [/Fach wechseln/, /Frag Ferdinand/, /Die vier Arten zu üben/, /Ampel und Können/, /Taschenrechner und Formelblatt/]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
  await expect(page.getByRole("button", { name: /Profil anlegen/ })).toBeVisible();
  await shot(page, "1-page");
});

test("first profile gets the welcome tour, once", async ({ page }) => {
  await page.goto("/#/");
  await page.getByPlaceholder("z. B. Lea").fill("Neu");
  await page.getByRole("button", { name: "Los geht's", exact: true }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/Ferdinand zeigt dir alles · 1 von/)).toBeVisible();
  await shot(page, "2-tour-step1");

  // Enter walks through the steps (the tour is keyboard-driven, like the Eulen-Lektionen).
  await page.keyboard.press("Enter");
  await expect(dialog.getByRole("heading", { name: /Fach wechseln/ })).toBeVisible();
  await shot(page, "3-tour-faecher");
  for (let i = 0; i < 20; i++) {
    if (await dialog.getByRole("button", { name: /Los geht's!/ }).isVisible().catch(() => false)) {
      await shot(page, "4-tour-last");
      break;
    }
    await page.keyboard.press("Enter");
  }
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByText("Deine Themen")).toBeVisible();

  // Seen once — a reload must not show it again.
  await page.reload();
  await expect(page.getByText("Deine Themen")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);

  // …but it can be replayed from the help page.
  await page.goto("/#/hilfe");
  await page.getByRole("button", { name: /Tour noch einmal ansehen/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

// Desktop only: on the emulated phone the dashboard forces a 593 px layout viewport
// (pre-existing horizontal overflow), which makes Playwright's mobile clicks miss.
test("dashboard and start page link into the help page", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "mobile hit-testing is off while the dashboard overflows");
  await page.goto("/#/");
  await page.getByRole("link", { name: /So funktioniert der MSA Trainer/ }).click();
  await expect(page.getByRole("heading", { name: "So funktioniert der MSA Trainer" })).toBeVisible();

  await page.goto("/#/");
  await page.getByPlaceholder("z. B. Lea").fill("Hilfe");
  await page.getByRole("button", { name: "Los geht's", exact: true }).click();
  await dismissTour(page);
  await page.getByRole("link", { name: /So funktioniert's/ }).click();
  await expect(page.getByRole("heading", { name: "So funktioniert der MSA Trainer" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Tour noch einmal ansehen/ })).toBeVisible();
});
