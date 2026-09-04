/** WRITE tasks: free text with rule checks and the Schreibplan grid, via the preview route. */
import { expect, test, type Page } from "@playwright/test";

const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(400);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-write-${name}.png`, fullPage: true });
};

test("blog reply: word counter, checklist and Musterlösung", async ({ page }) => {
  await page.goto("/#/preview/EN_WRITE_BLOG_TATTOOS_2024");
  await page.getByText("Erklärung").waitFor();
  const box = page.getByLabel("Dein Text");
  await expect(box).toBeVisible();

  // Too short and one question skipped → not passed, checklist names the gap.
  await box.fill("Hey Inky,\n\nMy parents are relaxed about tattoos. I would like one.\n\nBest,\nSam");
  await expect(page.getByText(/\d+ Wörter/)).toBeVisible();
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByText(/Noch nicht/)).toBeVisible();
  await expect(page.getByText("Your opinion on the age limit")).toBeVisible();
  await shot(page, "1-blog-short");

  // A complete answer passes.
  await page.getByRole("button", { name: "Zurücksetzen" }).click();
  // 100+ words, every question answered, greeting, closing, paragraphs.
  await box.fill(
    "Hey Inky,\n\nI read your post and I know exactly how you feel, so here are my thoughts.\n\nMy parents are quite relaxed about tattoos, my mum even has a small one on her wrist. They say I should wait until I am 18 though, because I might regret it later.\n\nI would like to get one one day, something small that means a lot to me, but I want to be really sure about it first.\n\nFor me, offensive or racist tattoos are an absolute no-go, because they hurt other people and you cannot take them back.\n\nAbout the age limit: I think 18 makes sense, a tattoo is for life and at 16 we change our minds every month. Two years is not that long.\n\nBest,\nSam",
  );
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByText(/Richtig — Inhalt und Aufbau erfüllt/)).toBeVisible();
  await shot(page, "2-blog-pass");
});

test("Schreibplan grid scores per field", async ({ page }) => {
  await page.goto("/#/preview/DE_WRITE_PLAN_VEGGIE_2023");
  await page.getByText("Erklärung").waitFor();
  await page.getByLabel("Schreibanlass").fill("Schulprojekt Nachhaltige Ernährung");
  await page.getByLabel("These", { exact: true }).fill("Ein Veggie-Day ist sinnvoll");
  await page.getByLabel("1. Argument (These)").fill("Gesundheitliche Vorteile durch weniger Fleisch");
  await expect(page.getByText(/3 von 19 Feldern/)).toBeVisible();
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByText(/3 von 19 Feldern ausgefüllt/)).toBeVisible();
  await shot(page, "3-schreibplan");
});

test("Erörterung: both sides, Belege and the opinion at the end", async ({ page }) => {
  await page.goto("/#/preview/DE_WRITE_EROERTERUNG_VEGGIE_2023");
  await page.getByText("Erklärung").waitFor();
  await page.getByLabel("Dein Text").fill("Ich finde einen Veggie-Day gut. Ein Vorteil ist die Gesundheit. Das ist krass wichtig.");
  await page.getByRole("button", { name: "Antwort prüfen" }).click();
  await expect(page.getByText("Beide Seiten: Pro und Kontra")).toBeVisible();
  await expect(page.getByText("Eigene Meinung erst im Schluss")).toBeVisible();
  await expect(page.getByText(/ist Umgangssprache/)).toBeVisible();
  await shot(page, "4-eroerterung-checks");
});
