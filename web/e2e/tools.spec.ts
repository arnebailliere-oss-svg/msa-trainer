/**
 * The tools around the tasks, used as a learner uses them: the Formelblatt drawer inside a session and
 * the backup (export on one device, import on another, restore on the same device). Targets the dev server.
 */
import fs from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

const total = (page: Page, n: string) => page.locator("text=Aufgaben gesamt").locator("..").getByText(n, { exact: true });

/** Answers one task. Tasks come in random order, so a start with a matching or gap task is simply started again. */
async function answerOne(page: Page) {
  for (let attempt = 0; attempt < 8; attempt++) {
    await page.goto(`${DEV}/#/topic/MATH_GEO_UNITS`);
    await page.getByRole("button", { name: /Jetzt üben/ }).click();
    await expect(page.getByText(/Thema üben/)).toBeVisible();
    const radio = page.getByRole("radio").first();
    const field = page.getByLabel("Antwort");
    if (await radio.isVisible().catch(() => false)) await radio.click();
    else if (await field.isVisible().catch(() => false)) await field.fill("1");
    else continue;
    await page.getByRole("button", { name: "Antwort prüfen" }).click();
    await expect(page.getByRole("button", { name: /Weiter/ })).toBeVisible();
    return;
  }
  throw new Error("no task with choices or a typed answer came up");
}

test("Formelblatt drawer: opens over the task, fits the screen, closes again", async ({ page }) => {
  await createProfile(page, "Formeln");
  await page.goto(`${DEV}/#/topic/MATH_GEO_UNITS`);
  await page.getByRole("button", { name: /Jetzt üben/ }).click();
  await expect(page.getByText(/Thema üben/)).toBeVisible();
  const task = await page.locator("main p").first().innerText();

  await page.getByRole("button", { name: "Formelblatt" }).click();
  const drawer = page.getByRole("dialog", { name: "Formelblatt" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("columnheader", { name: "Zeichen" }).first()).toBeVisible();
  await expect(drawer.locator(".katex-error")).toHaveCount(0);
  // nothing sticks out sideways: neither the drawer nor a table without its own scroll box
  const wide = await drawer.evaluate((el) => {
    const cut = [...el.querySelectorAll("table")].filter((t) => t.scrollWidth > t.parentElement!.clientWidth + 1 && getComputedStyle(t.parentElement!).overflowX === "visible").length;
    return { over: el.scrollWidth - el.clientWidth, cut };
  });
  expect(wide.over).toBeLessThanOrEqual(1);
  expect(wide.cut).toBe(0);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-tools-formelblatt.png` });

  // Escape closes it, and the task is still the same one
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  expect(await page.locator("main p").first().innerText()).toBe(task);
  // the close button works too
  await page.getByRole("button", { name: "Formelblatt" }).click();
  await drawer.getByRole("button", { name: "Schließen" }).click();
  await expect(drawer).toBeHidden();
});

test("backup: export, import on another device, restore on the same device", async ({ page, browser }) => {
  test.setTimeout(120_000);
  await createProfile(page, "Sicherung");
  await answerOne(page);

  // straight to the progress page, without finishing the session first: the answer is in the file
  await page.goto(`${DEV}/#/overview`);
  await expect(total(page, "1")).toBeVisible();
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: /Exportieren/ }).click()]);
  const file = test.info().outputPath("sicherung.json");
  await download.saveAs(file);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  expect(data.profiles.map((p: { name: string }) => p.name)).toContain("Sicherung");
  expect(JSON.stringify(data.progress)).toContain("MATH_GEO_UNITS");

  // a second device: empty browser, own profile, then import
  const other = await browser.newContext({ viewport: page.viewportSize() ?? undefined });
  const p2 = await other.newPage();
  await createProfile(p2, "Neu");
  await p2.goto(`${DEV}/#/overview`);
  await p2.locator('input[type="file"]').setInputFiles(file);
  // the confirmation stays on the page, and the learner's own profile stays open
  await expect(p2.getByText("Sicherung eingelesen: 1 Profil.")).toBeVisible();
  await expect(p2.getByRole("heading", { name: "Fortschritt im Detail" })).toBeVisible();
  // a file that is not a backup gets a plain sentence
  const bad = test.info().outputPath("falsch.json");
  fs.writeFileSync(bad, "{}");
  await p2.locator('input[type="file"]').setInputFiles(bad);
  await expect(p2.getByText("Keine gültige MSA-Trainer-Sicherung.")).toBeVisible();
  // the imported profile can be chosen right away, without reloading the page
  await p2.goto(`${DEV}/#/`);
  await p2.getByRole("button", { name: /Sicherung/ }).first().click();
  await p2.getByText("Deine Themen").waitFor();
  await p2.keyboard.press("Escape");
  await p2.goto(`${DEV}/#/overview`);
  await expect(total(p2, "1")).toBeVisible();
  await other.close();

  // same device: reading the backup back in restores the state of the file for the open profile
  await answerOne(page);
  await page.goto(`${DEV}/#/overview`);
  await expect(total(page, "2")).toBeVisible();
  await page.locator('input[type="file"]').setInputFiles(file);
  await expect(page.getByText("Sicherung eingelesen: 1 Profil.")).toBeVisible();
  await expect(total(page, "1")).toBeVisible();
  await page.reload();
  await expect(total(page, "1")).toBeVisible();
});

test("progress page: the table fits a phone and the star is explained", async ({ page }) => {
  await createProfile(page, "Fortschritt");
  await page.goto(`${DEV}/#/overview`);
  await expect(page.getByText("⭐ bedeutet: Dieses Thema ist für die Prüfung besonders wichtig.")).toBeVisible();
  // no table needs sideways scrolling to show its last column
  const hidden = await page.evaluate(() => [...document.querySelectorAll("table")].filter((t) => t.scrollWidth > t.parentElement!.clientWidth + 1).length);
  expect(hidden).toBe(0);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-tools-fortschritt.png` });
});
