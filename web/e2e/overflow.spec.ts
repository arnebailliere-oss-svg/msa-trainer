/**
 * Mobile layout guard: no page may be wider than the phone screen (that makes the browser zoom out and
 * the whole layout "swim"). Lists the offending elements when it fails.
 */
import { expect, test, type Page } from "@playwright/test";
import { createProfile, DEV } from "./helpers";

interface Offender {
  tag: string;
  cls: string;
  text: string;
  right: number;
  width: number;
}

async function overflow(page: Page, device: number): Promise<{ inner: number; scroll: number; offenders: Offender[] }> {
  await page.waitForTimeout(400);
  return page.evaluate((device) => {
    const inner = window.innerWidth;
    const scroll = document.documentElement.scrollWidth;
    const limit = Math.min(inner, device);
    const offenders: Offender[] = [];
    // "Widest leaves": elements wider than the phone whose children all fit — these drive the min-content width
    // that makes Chromium widen the layout viewport (innerWidth > device width) and zoom the page out.
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
      const r = el.getBoundingClientRect();
      if (r.width <= limit + 1 || r.width === 0) continue;
      const kids = Array.from(el.children) as HTMLElement[];
      if (kids.some((k) => k.getBoundingClientRect().width > limit + 1)) continue;
      const cs = getComputedStyle(el);
      offenders.push({ tag: el.tagName.toLowerCase(), cls: `${el.className?.toString().slice(0, 70) ?? ""} | ${cs.display} ${cs.whiteSpace} minw=${cs.minWidth}`, text: (el.textContent ?? "").trim().slice(0, 40), right: Math.round(r.right), width: Math.round(r.width) });
    }
    offenders.sort((a, b) => b.width - a.width);
    return { inner, scroll, offenders: offenders.slice(0, 12) };
  }, device);
}

const check = async (page: Page, name: string) => {
  const device = page.viewportSize()?.width ?? 412;
  const o = await overflow(page, device);
  const msg = `${name}: innerWidth ${o.inner}, scrollWidth ${o.scroll}, device ${device}\n` + o.offenders.map((x) => `  <${x.tag} class="${x.cls}"> right=${x.right} width=${x.width} "${x.text}"`).join("\n");
  console.log(msg);
  expect(o.inner, msg).toBeLessThanOrEqual(device);
  expect(o.scroll, msg).toBeLessThanOrEqual(o.inner);
  await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-overflow-${name}.png`, fullPage: true });
};

test("no horizontal overflow on the main screens", async ({ page }) => {
  test.setTimeout(180_000);
  await page.goto(`${DEV}/#/`);
  await check(page, "start");
  await createProfile(page, "Handy");
  await check(page, "home");
  await page.goto(`${DEV}/#/topic/MATH_GEO_AREA_BASIC`);
  await check(page, "topic");
  await page.goto(`${DEV}/#/session/PLAN/MATH`);
  await expect(page.getByText(/Tagesplan/)).toBeVisible();
  await check(page, "session");
  // The calculator must open with its display field on screen (it used to hide behind the browser's address bar).
  const calcButton = page.getByRole("button", { name: "Taschenrechner" });
  if (await calcButton.isEnabled().catch(() => false)) {
    const original = page.viewportSize();
    await page.setViewportSize({ width: 375, height: 620 }); // small iPhone with the browser bars showing
    await calcButton.click();
    const display = page.getByLabel("Ausdruck");
    await expect(display).toBeVisible();
    const box = (await display.boundingBox())!;
    expect(box.y, "calculator display above the viewport").toBeGreaterThanOrEqual(0);
    expect(box.y + box.height, "calculator display below the viewport").toBeLessThanOrEqual(620);
    await page.screenshot({ path: `e2e/screenshots/${test.info().project.name}-overflow-calculator.png` });
    await page.getByRole("button", { name: "Schließen" }).click();
    if (original) await page.setViewportSize(original);
  }
  await page.goto(`${DEV}/#/eule/P_MATH_ZEICHEN`);
  await check(page, "eule");
  await page.goto(`${DEV}/#/hilfe`);
  await check(page, "hilfe");
  await page.goto(`${DEV}/#/overview`);
  await check(page, "overview");
  await page.goto(`${DEV}/#/preview/EN_MSA2024_R3_17`);
  await check(page, "passage");
});
