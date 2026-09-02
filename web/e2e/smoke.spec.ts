/**
 * End-to-end smoke: profile → dashboard → topic session → answer → feedback → result.
 * Also drops screenshots into e2e/screenshots for visual review.
 */
import { expect, test, type Page } from "@playwright/test";

const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(500); // let entry animations settle
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-${name}.png`, fullPage: true });
};

test("full flow", async ({ page }) => {
  await page.goto("/#/");
  await expect(page.getByRole("heading", { name: /MSA/ })).toBeVisible();
  await shot(page, "01-start");

  await page.getByPlaceholder("z. B. Lea").fill("Test");
  await page.getByRole("button", { name: "🦄" }).click();
  await page.getByRole("button", { name: "Los geht's" }).click();

  await expect(page.getByText(/Hey Test/)).toBeVisible();
  await expect(page.getByText("Deine Themen")).toBeVisible();
  await shot(page, "02-dashboard");

  // Open a topic page
  await page.getByRole("link", { name: /Prozentrechnung Grundlagen/ }).click();
  await expect(page.getByRole("heading", { name: /Prozentrechnung Grundlagen/ })).toBeVisible();
  await shot(page, "03-topic");

  // Start practising this topic
  await page.getByRole("button", { name: /Jetzt üben/ }).click();
  await expect(page.getByText(/Thema üben/)).toBeVisible();
  await shot(page, "04-question");

  // Answer: pick first MCQ option or type a wrong number, then check feedback appears
  const radio = page.getByRole("radio").first();
  if (await radio.isVisible().catch(() => false)) {
    await radio.click();
  } else {
    await page.getByLabel("Antwort").fill("12345");
  }
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByRole("button", { name: /Weiter/ })).toBeVisible();
  await expect(page.getByText(/Richtig!|Leider nicht richtig/)).toBeVisible();
  await shot(page, "05-feedback");

  // Calculator opens for math
  await page.getByRole("button", { name: "Taschenrechner" }).click();
  await page.getByLabel("Ausdruck").fill("12,5*4+sin(30)");
  await page.getByLabel("Ausdruck").press("Enter");
  await expect(page.getByText("= 50,5")).toBeVisible();
  await shot(page, "06-calculator");
  await page.getByRole("button", { name: "Schließen" }).click();

  // Finish early → result
  await page.getByRole("button", { name: /Beenden/ }).click();
  await expect(page.getByText(/richtig ·/)).toBeVisible();
  await shot(page, "07-result");

  // Progress persisted: overview shows 1 attempt
  await page.getByRole("button", { name: "Zur Übersicht" }).click();
  await page.getByRole("link", { name: "Fortschritt" }).click();
  await expect(page.getByText("Aufgaben gesamt")).toBeVisible();
  await expect(page.locator("text=Aufgaben gesamt").locator("..").getByText("1")).toBeVisible();
  await shot(page, "08-overview");

  // Reload keeps the profile and progress (IndexedDB)
  await page.reload();
  await expect(page.getByText("Aufgaben gesamt")).toBeVisible();
});

test("quick training runs through repair mode", async ({ page }) => {
  await page.goto("/#/");
  await page.getByPlaceholder("z. B. Lea").fill("Repair");
  await page.getByRole("button", { name: "Los geht's" }).click();
  await page.getByRole("button", { name: /Schnelltraining/ }).click();
  await expect(page.getByText(/Schnelltraining · Mathe/)).toBeVisible();

  // Answer wrong on purpose → repair banner must appear
  const radio = page.getByRole("radio").first();
  if (await radio.isVisible().catch(() => false)) {
    // pick every option until wrong? simpler: pick first; if it was right, pick wrong on next
    await radio.click();
  } else {
    await page.getByLabel("Antwort").fill("-99999");
  }
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await page.getByRole("button", { name: /Weiter/ }).click();
  for (let i = 0; i < 3; i++) {
    const banner = page.getByText(/Reparatur-Modus/);
    if (await banner.isVisible().catch(() => false)) {
      await shot(page, "09-repair");
      return;
    }
    const r = page.getByRole("radio").first();
    if (await r.isVisible().catch(() => false)) await r.click();
    else await page.getByLabel("Antwort").fill("-99999");
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await page.getByRole("button", { name: /Weiter/ }).click();
  }
  await expect(page.getByText(/Reparatur-Modus/)).toBeVisible();
});
