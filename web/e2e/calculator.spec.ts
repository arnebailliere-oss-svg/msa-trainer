/**
 * The pocket calculator, key by key, as a learner uses it in a maths session.
 */
import { expect, test, type Page } from "@playwright/test";
import { dismissTour } from "./helpers";

async function openCalculator(page: Page) {
  await page.goto("/#/");
  await page.getByPlaceholder("z. B. Lea").fill("Rechner");
  await page.getByRole("button", { name: "Los geht's" }).click();
  await page.getByText("Deine Themen").waitFor();
  await dismissTour(page);
  await page.getByRole("link", { name: /Prozentrechnung Grundlagen/ }).click();
  await page.getByRole("button", { name: /Jetzt üben/ }).click();
  await expect(page.getByText(/Thema üben/)).toBeVisible();
  await page.getByRole("button", { name: "Taschenrechner" }).click();
  return page.getByRole("dialog", { name: "Taschenrechner" });
}

test("every key works and the calculator behaves like a school calculator", async ({ page }) => {
  const calc = await openCalculator(page);
  const field = calc.getByLabel("Ausdruck");
  const key = (name: string) => calc.getByRole("button", { name, exact: true });
  const type = async (...names: string[]) => {
    for (const n of names) await key(n).click();
  };
  const shows = (text: string) => expect(calc.getByText(text, { exact: true })).toBeVisible();
  const clear = () => key("Löschen").click();

  // the four basic operations, each with its own key
  await type("2", "2", "0", "geteilt", "1", "0", "ist gleich");
  await expect(field).toHaveValue("220÷10");
  await shows("= 22");
  await clear();
  await type("7", "mal", "8", "ist gleich");
  await shows("= 56");
  await clear();
  await type("9", "minus", "4", "ist gleich");
  await shows("= 5");
  await clear();
  await type("6", "plus", "3", "ist gleich");
  await shows("= 9");

  // a sign after "=" goes on with the result; a digit starts a new calculation
  await type("mal", "2", "ist gleich");
  await expect(field).toHaveValue("9×2");
  await shows("= 18");
  await type("5");
  await expect(field).toHaveValue("5");
  await clear();

  // comma, brackets, percent, power
  await type("1", "Komma", "5", "plus", "2", "Komma", "5", "ist gleich");
  await shows("= 4");
  await clear();
  await type("(", "2", "plus", "3", ")", "mal", "4", "ist gleich");
  await shows("= 20");
  await clear();
  await type("2", "0", "0", "mal", "1", "9", "Prozent", "ist gleich");
  await shows("= 38");
  await clear();
  await type("2", "hoch", "1", "0", "ist gleich");
  await shows("= 1024");
  await clear();

  // the function row; an open bracket at the end is closed
  await type("Wurzel", "1", "6", "ist gleich");
  await expect(field).toHaveValue("√(16");
  await shows("= 4");
  await clear();
  await type("Sinus", "3", "0", "ist gleich");
  await shows("= 0,5");
  await clear();
  await type("Kosinus", "6", "0", ")", "ist gleich");
  await shows("= 0,5");
  await clear();
  await type("Tangens", "4", "5", "ist gleich");
  await shows("= 1");
  await clear();
  await type("2", "Pi", "ist gleich");
  await shows("= 6,283185");
  await clear();
  await type("minus", "3", "hoch 2", "ist gleich");
  await expect(field).toHaveValue("−3²");
  await shows("= −9");
  await type("hoch 2", "ist gleich"); // (−9)², not −9²
  await shows("= 81");
  await clear();

  // the delete key takes a whole function away, then single signs
  await type("5", "plus", "Sinus");
  await key("Letztes Zeichen löschen").click();
  await expect(field).toHaveValue("5+");
  await key("Letztes Zeichen löschen").click();
  await expect(field).toHaveValue("5");
  await clear();
  await expect(field).toHaveValue("");

  // mistakes get a plain German sentence
  await type("5", "geteilt", "0", "ist gleich");
  await shows("Division durch Null geht nicht");
  await clear();
  await type("5", "plus", "ist gleich");
  await shows("Die Rechnung ist noch nicht fertig");
  await clear();

  // typing with the keyboard works too
  await field.fill("12,5 · 4 + sin(30)");
  await field.press("Enter");
  await shows("= 50,5");
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-calculator-keys.png` });

  // on a phone every key is reachable without leaving the screen
  const box = await key("ist gleich").boundingBox();
  const view = page.viewportSize()!;
  expect(box && box.y >= 0 && box.y + box.height <= view.height).toBe(true);
});

test("Enter inside the calculator does not check the answer or move on", async ({ page }) => {
  const calc = await openCalculator(page);
  await calc.getByRole("button", { name: "Schließen" }).click();

  // an answer is chosen but not yet checked
  const radio = page.getByRole("radio").first();
  if (await radio.isVisible().catch(() => false)) await radio.click();
  else await page.getByLabel("Antwort").fill("12345");

  await page.getByRole("button", { name: "Taschenrechner" }).click();
  const field = calc.getByLabel("Ausdruck");
  await field.fill("3 * 4");
  await field.press("Enter");
  await expect(calc.getByText("= 12", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Antwort prüfen" })).toBeVisible();

  // Enter while a calculator key has the focus
  await calc.getByRole("button", { name: "ist gleich", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Antwort prüfen" })).toBeVisible();

  // after the answer is checked, Enter in the calculator must not jump to the next question
  await calc.getByRole("button", { name: "Schließen" }).click();
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByRole("button", { name: /Weiter/ })).toBeVisible();
  await page.getByRole("button", { name: "Taschenrechner" }).click();
  await field.fill("7 * 7");
  await field.press("Enter");
  await expect(calc.getByText("= 49", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Weiter/ })).toBeVisible();
});
