// Render public/icons/icon.svg to the PNG sizes the PWA manifest needs.
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
const svg = readFileSync(new URL("../public/icons/icon.svg", import.meta.url), "utf8");
const browser = await chromium.launch();
for (const size of [192, 512]) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace(/width="512" height="512"/, `width="${size}" height="${size}"`)}</body></html>`);
  const buf = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
  writeFileSync(new URL(`../public/icons/icon-${size}.png`, import.meta.url), buf);
  console.log(`icon-${size}.png`, buf.length, "bytes");
}
await browser.close();
