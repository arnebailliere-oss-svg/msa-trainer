/**
 * The word card of an owl lesson: reachable from every board, shows the words and signs of the current board
 * first, and does not move the board while it is open. Targets the dev server.
 */
import { expect, test } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

test("word card: the signs of the current board are explained, the board stays put", async ({ page }) => {
  test.setTimeout(120_000);
  await createProfile(page, "Wörter");
  await page.goto(`${DEV}/#/eule/P_MATH_FUNKTION`);
  await page.getByRole("button", { name: /Los geht's/ }).first().click();
  const title = "Der Startwert steht in der Regel";
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(330);
    if (await page.getByRole("heading", { name: title, exact: true }).isVisible().catch(() => false)) break;
    await page.keyboard.press("Enter");
  }
  await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();

  await page.getByRole("button", { name: /Wörter und Zeichen/ }).click();
  const card = page.getByRole("dialog", { name: "Wörter und Zeichen" });
  await expect(card).toBeVisible();
  await expect(card.getByText("Der Buchstabe für den Startwert.", { exact: false })).toBeVisible();
  await expect(card.getByText("Das Fachwort für den Startwert.")).toBeVisible();
  await expect(card.getByText("Die Zahl, die in die Maschine hineinkommt.")).toBeVisible();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-words-card.png` });

  // Enter does not turn the board while the card is open; Escape closes the card
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);
  await expect(card).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(card).toBeHidden();
  await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-words-board.png` });
});
