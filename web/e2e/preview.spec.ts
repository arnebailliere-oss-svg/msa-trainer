import { test } from "@playwright/test";

/**
 * Visual review of generated figures and lesson widgets via the preview route.
 * Targets the running dev server (npm run dev) so it does not need a production build.
 */
const DEV = "http://127.0.0.1:5173";
const IDS = [
  "MATH_PYTH_HYPOTENUSE_T1",
  "MATH_PYTH_KATHETE_T1",
  "MATH_TRIG_SINUSSATZ_T1",
  "MATH_TRIG_KOSINUSSATZ_T1",
  "MATH_GEO_PARALLELOGRAMM_MCQ_T1",
  "MATH_GEO_TRAPEZ_T1",
  "MATH_GEO_KREIS_FLAECHE_AUS_UMFANG_T1",
  "MATH_FUNC_STEIGUNG_T1",
  "MATH_FUNC_QUAD_SCHEITEL_MCQ_T1",
  "MATH_PROB_SUMMENREGEL_T1",
  "MATH_KOERPER_QUADER_V_T1",
  "MATH_KOERPER_ZYLINDER_D_LITER_T1",
  "MATH_CHARTS_KREIS_WINKEL_T1",
  "MATH_GEO_KOORDINATEN_MCQ_T1",
  "MATH_FRAC_ADD_UNGLEICH_T1",
  "MATH_EQU_QUAD_PQ_MCQ_T1",
];

test("figure previews", async ({ page }) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ colorScheme: "dark" });
  for (const id of IDS) {
    await page.goto(`${DEV}/#/preview/${id}`);
    await page.getByText("Erklärung").waitFor();
    await page.waitForTimeout(400);
    await page.screenshot({ path: `e2e/screenshots/preview-${id}.png`, fullPage: true });
  }
});

test("lesson widgets", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto(`${DEV}/#/`);
  await page.getByPlaceholder("z. B. Lea").fill("Widget");
  await page.getByRole("button", { name: "Los geht's" }).click();
  await page.getByText("Deine Themen").waitFor();
  await page.goto(`${DEV}/#/topic/MATH_FUNC_LINEAR_FORM`);
  await page.getByText("Probier es aus").first().waitFor();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "e2e/screenshots/preview-lesson-funktionen.png", fullPage: true });
  await page.goto(`${DEV}/#/topic/MATH_GEO_PYTH`);
  await page.getByText("Probier es aus").first().waitFor();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "e2e/screenshots/preview-lesson-pythagoras.png", fullPage: true });
});
