/**
 * Typed answers: input the app cannot read is sent back with a sentence and is not counted as wrong;
 * a number with its unit typed after it is checked like the bare number. Targets the dev server.
 */
import { expect, test } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

test("unreadable input is sent back, a number with a unit is checked", async ({ page }) => {
  const topic = process.env.ANSWER_TOPIC ?? "MATH_GEO_UNITS";
  await createProfile(page, "Antwort");
  await page.goto(`${DEV}/#/topic/${topic}`);
  await page.getByRole("button", { name: /Jetzt üben/ }).click();
  await expect(page.getByText(/Thema üben/)).toBeVisible();
  // move on until a question with a typed answer is shown
  const field = page.getByLabel("Antwort");
  for (let i = 0; i < 12 && !(await field.isVisible().catch(() => false)); i++) {
    await page.getByRole("radio").first().click().catch(() => {});
    await page.getByRole("button", { name: "Antwort prüfen" }).click().catch(() => {});
    await page.getByRole("button", { name: /Weiter/ }).click().catch(() => {});
  }
  await expect(field).toBeVisible();

  await field.fill("keine Ahnung");
  await field.press("Enter");
  await expect(page.getByRole("alert")).toContainText(/nicht als (Zahl|Bruch) lesen/);
  await expect(page.getByRole("button", { name: "Antwort prüfen" })).toBeVisible();
  await expect(page.getByText(/Richtig!|Leider nicht richtig/)).toHaveCount(0);

  // typing again removes the sentence; a number with a unit is accepted as an answer
  await field.fill("5 cm");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await field.press("Enter");
  await expect(page.getByText(/Richtig!|Leider nicht richtig/)).toBeVisible();
  await expect(page.getByRole("button", { name: /Weiter/ })).toBeVisible();
  // the Enter that submitted the answer did not also jump to the next question
  await page.waitForTimeout(600);
  await expect(page.getByText(/Richtig!|Leider nicht richtig/)).toBeVisible();
  await expect(page.getByText("1/8")).toBeVisible();
  // a second Enter moves on
  await page.keyboard.press("Enter");
  await expect(page.getByText("2/8")).toBeVisible();
});
