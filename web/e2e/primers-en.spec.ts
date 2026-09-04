/** The rewritten English Eulen-Lektionen: every board renders, the quiz can be answered, the primer completes. */
import { expect, test, type Page } from "@playwright/test";
import { createProfile } from "./helpers";

const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(350);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-primer-${name}.png`, fullPage: true });
};

/** Click through intro → boards → vocab → quiz, answering by picking the first choice, and expect the done board. */
async function runPrimer(page: Page, id: string, expectBoards: number) {
  await page.goto(`/#/eule/${id}`);
  await expect(page.getByText(new RegExp(`${expectBoards} Tafeln`))).toBeVisible();
  await shot(page, `${id}-intro`);
  await page.getByRole("button", { name: /Los geht's/ }).click();
  for (let i = 1; i <= expectBoards; i++) {
    await expect(page.getByText(`Tafel ${i} von ${expectBoards}`)).toBeVisible();
    if (i === 3 || i === Math.ceil(expectBoards / 2)) await shot(page, `${id}-board${i}`);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(320); // wipe animation
  }
  // Vocab board, then the quiz.
  await expect(page.getByRole("heading", { name: "Die Wörter" })).toBeVisible();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(320);
  for (let q = 0; q < 12; q++) {
    const done = page.getByText(/Geschafft!|Fast!/);
    if (await done.isVisible().catch(() => false)) break;
    await page.keyboard.press("1");
    await page.waitForTimeout(150);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(320);
  }
  await expect(page.getByText(/Geschafft!|Fast!/)).toBeVisible();
  await shot(page, `${id}-done`);
}

test("English primers run end to end", async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto("/#/");
  await createProfile(page, "Eule", "http://127.0.0.1:4173");
  await runPrimer(page, "P_EN_READING", 26);
  await runPrimer(page, "P_EN_EMAIL", 19);
  await runPrimer(page, "P_EN_ZEITFORMEN", 20);
});
