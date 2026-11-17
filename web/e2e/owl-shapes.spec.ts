/**
 * Owl boards show the shapes they talk about, and the try-it-out elements work on the board.
 * Targets the dev server.
 */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

async function openBoard(page: Page, id: string, title: string) {
  await page.goto(`${DEV}/#/eule/${id}`);
  await page.waitForTimeout(800);
  // A lesson that was opened before continues where the student stopped, without the intro board.
  const start = page.getByRole("button", { name: /Los geht's/ }).first();
  if (await start.isVisible({ timeout: 3000 }).catch(() => false)) await start.click();
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(330);
    if (await page.getByRole("heading", { name: title, exact: true }).isVisible().catch(() => false)) return;
    await page.keyboard.press("Enter");
  }
  throw new Error(`${id}: board "${title}" not reached`);
}
const noOverflow = async (page: Page) => expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
const shot = async (page: Page, name: string) => {
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-owl-${name}.png` });
};

test("boards show their shapes and the try-it-out elements", async ({ page }) => {
  test.setTimeout(420_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await createProfile(page, "Formen");

  await openBoard(page, "P_MATH_KOERPER", "Grundfläche mal Höhe");
  await expect(page.locator(".chalk-board-figure svg")).toHaveCount(3);
  for (const name of ["Quader", "Zylinder", "Prisma"]) await expect(page.locator("figcaption", { hasText: name })).toBeVisible();
  await noOverflow(page);
  await shot(page, "koerper-drei-formen");

  // the circle is taught before the can, and the Mantel formula is built in two boards
  for (const [title, name] of [["Umfang des Kreises", "kreis-umfang"], ["Der Mantel", "mantel-1"], ["Der Mantel mit dem Radius", "mantel-2"]] as const) {
    await openBoard(page, "P_MATH_KOERPER", title);
    await expect(page.locator(".chalk-board-figure svg")).toHaveCount(1);
    await noOverflow(page);
    await shot(page, name);
  }

  await openBoard(page, "P_MATH_KOERPER", "Spitze Körper: ein Drittel");
  await expect(page.locator(".chalk-board-figure svg")).toHaveCount(2);
  await noOverflow(page);
  await shot(page, "koerper-spitz");

  await openBoard(page, "P_MATH_GEO_BEGRIFFE", "Winkel-Sorten");
  await expect(page.locator(".chalk-board-figure svg")).toHaveCount(4);
  await noOverflow(page);
  await shot(page, "winkel-sorten");


  await openBoard(page, "P_MATH_FUNKTION", "Die allgemeine Form");
  await expect(page.locator('[data-owl-widget="line-explorer"]')).toBeVisible();
  await noOverflow(page);
  await shot(page, "gerade-ausprobieren");

  await openBoard(page, "P_MATH_QUADRAT", "Die Parabel verschieben");
  await expect(page.locator('[data-owl-widget="parabola-explorer"]')).toBeVisible();
  await noOverflow(page);
  await shot(page, "parabel-ausprobieren");

  // new topics: each board is reachable, shows its drawing and fits the screen
  for (const [id, title, name] of [
    ["P_MATH_GEO_BEGRIFFE", "Fläche vom Trapez", "neu-trapez"],
    ["P_MATH_FUNKTION", "Mal statt plus", "neu-wachstum"],
    ["P_MATH_PYTH_TRIG", "Kosinussatz: Schritt für Schritt", "neu-kosinussatz"],
    ["P_MATH_STOCHASTIK", "Das Kreisdiagramm", "neu-kreisdiagramm"],
  ] as const) {
    await openBoard(page, id, title);
    await expect(page.locator(".chalk-board-figure svg")).toHaveCount(1);
    await noOverflow(page);
    await shot(page, name);
  }
  await openBoard(page, "P_MATH_TERME", "Die zweite und die dritte");
  await noOverflow(page);
  await shot(page, "neu-binomisch");

  // last, because it is the final board of its lesson
  await openBoard(page, "P_MATH_PYTH_TRIG", "Das nimmst du mit");
  const tri = page.locator('[data-owl-widget="triangle-explorer"]');
  await expect(tri).toBeVisible();
  const before = await tri.innerText();
  await tri.locator('input[type="range"]').first().focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => tri.innerText()).not.toBe(before);
  // the arrow keys moved the slider only: the board is still the same
  await expect(page.getByRole("heading", { name: "Das nimmst du mit", exact: true })).toBeVisible();
  await noOverflow(page);
  await shot(page, "pythagoras-ausprobieren");

  expect(errors).toEqual([]);
});
