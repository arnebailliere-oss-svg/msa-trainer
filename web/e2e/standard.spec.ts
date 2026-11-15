/**
 * Comprehensibility standard in the running app: a topic with a Spickzettel shows the guided
 * lessons first, the look-up cards open on tap, and a guided lesson has chapters, a pause
 * board between them and remembers where the student stopped. Targets the dev server.
 */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(1500); // chalk-write animation
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-standard-${name}.png`, fullPage: true });
};
const noOverflow = async (page: Page) => expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);

test("Spickzettel topic and chaptered lesson", async ({ page }) => {
  test.setTimeout(180_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await createProfile(page, "Standard");

  // Topic page: guided lessons first, then the Spickzettel
  await page.goto(`${DEV}/#/topic/EN_USE_TENSES`);
  await expect(page.getByRole("heading", { name: /Lernen mit Ferdinand/ })).toBeVisible();
  await expect(page.locator('[data-guided="P_EN_VERBFORMEN"]')).toBeVisible();
  await expect(page.getByText("Spickzettel zum Nachschlagen")).toBeVisible();
  await noOverflow(page);
  await shot(page, "1-topic");

  // A closed card opens on tap and shows a table
  const card = page.locator("details.sheet-card", { hasText: "Vergangenheit: was vorbei ist" });
  await expect(card.locator("table")).toBeHidden();
  await card.locator("summary").click();
  await expect(card.getByText("Past Progressive")).toBeVisible();
  await page.locator("details.sheet-card", { hasText: "Unregelmäßige Verben" }).locator("summary").click();
  await expect(page.getByText("brought").first()).toBeVisible();
  await noOverflow(page);
  await shot(page, "2-cards-open");

  // Guided lesson: chapters on the intro board
  await page.locator('[data-guided="P_EN_VERBFORMEN"]').click();
  await expect(page.getByText(/7 Kapitel/)).toBeVisible();
  await shot(page, "3-intro");
  const next = () => page.getByRole("button", { name: /Los geht's|Weiter/ }).first();
  await next().click();
  await expect(page.getByText("Kapitel 1 von 7 · Tafel 1 von")).toBeVisible();

  // Chapter 1 has four boards; after the last one comes the pause board
  for (let i = 0; i < 4; i++) await next().click();
  await expect(page.getByRole("heading", { name: "Zeit für eine Pause?" })).toBeVisible();
  await expect(page.getByText("kommt jetzt")).toBeVisible();
  await shot(page, "4-pause");

  // Continue into chapter 2, then leave: the lesson remembers the place
  await next().click();
  await expect(page.getByText("Kapitel 2 von 7 · Tafel 5 von")).toBeVisible();
  await next().click();
  await expect(page.getByText("Tafel 6 von")).toBeVisible();
  await page.goto(`${DEV}/#/topic/EN_USE_TENSES`);
  await expect(page.getByText(/angefangen, du kannst weitermachen/)).toBeVisible();
  await page.locator('[data-guided="P_EN_VERBFORMEN"]').click();
  await expect(page.getByText("hier warst du")).toBeVisible();
  await shot(page, "5-resume");
  await page.getByRole("button", { name: /Weitermachen/ }).first().click();
  await expect(page.getByText("Tafel 6 von")).toBeVisible();

  // A board with a short check: a wrong tap gives a hint, the right tap fills the gap
  await page.getByRole("button", { name: /Weiter/ }).first().click();
  await page.getByRole("button", { name: /Weiter/ }).first().click();
  await expect(page.getByText("he, she, it – wer ist das?")).toBeVisible();
  const task = page.locator('li[data-task="0"]');
  await task.getByRole("button", { name: "he", exact: true }).click();
  await expect(page.getByText(/Noch nicht ganz/)).toBeVisible();
  await expect(page.getByText(/Meine Mutter ist eine Frau/)).toBeVisible();
  await task.getByRole("button", { name: "she", exact: true }).click();
  await expect(page.getByText(/Genau!/)).toBeVisible();
  await noOverflow(page);
  await shot(page, "6-task");

  expect(errors).toEqual([]);
});
