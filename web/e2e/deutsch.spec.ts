/** Deutsch: lesson with owl card, a Komma drill (CLOZE with Komma/kein Komma), feedback, and a DE primer. */
import { expect, test, type Page } from "@playwright/test";

const DEV = "http://127.0.0.1:5173";
const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-de-${name}.png`, fullPage: true });
};

test("Deutsch lesson, drill and primer", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto(`${DEV}/#/`);
  await page.getByPlaceholder("z. B. Lea").fill("Deutsch");
  await page.getByRole("button", { name: "Los geht's" }).click();
  await page.getByText("Deine Themen").waitFor();
  await page.getByRole("button", { name: /Deutsch/ }).click();
  await shot(page, "1-dashboard");

  await page.goto(`${DEV}/#/topic/DE_PUNCT_COMMA_MAIN_SUB`);
  await expect(page.getByRole("heading", { name: /Kommasetzung/ })).toBeVisible();
  await expect(page.getByText("Grundlagen zuerst")).toBeVisible();
  await shot(page, "2-lesson-komma");

  await page.getByRole("button", { name: /Jetzt üben/ }).click();
  await expect(page.getByText(/Thema üben · Deutsch/)).toBeVisible();
  // Answer whatever comes: select in a CLOZE, first radio in an MCQ, or a MATCH pairing
  for (let i = 0; i < 3; i++) {
    const select = page.getByRole("combobox").first();
    const radio = page.getByRole("radio").first();
    if (await select.isVisible().catch(() => false)) {
      await select.selectOption({ index: 1 });
    } else if (await radio.isVisible().catch(() => false)) {
      await radio.click();
    } else {
      break;
    }
    if (i === 0) await shot(page, "3-drill");
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await expect(page.getByText(/Richtig!|Leider nicht richtig/)).toBeVisible();
    if (i === 0) await shot(page, "4-feedback");
    await page.getByRole("button", { name: /Weiter/ }).click();
    await page.waitForTimeout(300);
  }

  await page.goto(`${DEV}/#/eule/P_DE_SATZ`);
  await expect(page.getByText("Hauptsatz, Nebensatz, Komma").first()).toBeVisible();
  await shot(page, "5-primer");
});
