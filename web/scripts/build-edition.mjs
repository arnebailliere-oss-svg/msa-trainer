// Builds one product for the app shells (Windows, Android):
//   node scripts/build-edition.mjs <all|math|de|en> <outDir>
// The result is a self-contained folder: only the subjects of that product, no service worker.
// Run `npm run content` first; this script does not touch public/content.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const SUBJECTS = { all: ["MATH", "DE", "EN"], math: ["MATH"], de: ["DE"], en: ["EN"] };
const [edition, outArg] = process.argv.slice(2);
if (!SUBJECTS[edition] || !outArg) {
  console.error("usage: node scripts/build-edition.mjs <all|math|de|en> <outDir>");
  process.exit(1);
}
const out = resolve(outArg);
const keep = SUBJECTS[edition];

execFileSync(process.execPath, [join("node_modules", "vite", "bin", "vite.js"), "build", "--outDir", out, "--emptyOutDir"], {
  stdio: "inherit",
  env: { ...process.env, VITE_EDITION: edition, VITE_SHELL: "app", BASE_PATH: "./" },
});

// Content: only this product's subjects are shipped.
const content = join(out, "content");
const manifest = JSON.parse(readFileSync(join(content, "manifest.json"), "utf8"));
for (const s of Object.keys(manifest.subjects)) {
  if (keep.includes(s)) continue;
  rmSync(join(content, manifest.subjects[s].file), { force: true });
  delete manifest.subjects[s];
}
manifest.edition = edition;
writeFileSync(join(content, "manifest.json"), JSON.stringify(manifest, null, 2));
const topics = JSON.parse(readFileSync(join(content, "topics.json"), "utf8")).filter((t) => keep.includes(t.subject));
writeFileSync(join(content, "topics.json"), JSON.stringify(topics));

// No service worker inside an app: every file is local already.
for (const f of readdirSync(out)) if (/^(sw\.js|workbox-.*\.js|registerSW\.js|manifest\.webmanifest)(\.map)?$/.test(f)) rmSync(join(out, f));
const index = join(out, "index.html");
writeFileSync(index, readFileSync(index, "utf8").replace(/\s*<link rel="manifest"[^>]*>/g, "").replace(/\s*<script[^>]*registerSW\.js[^>]*><\/script>/g, ""));

const left = existsSync(content) ? readdirSync(content) : [];
console.log(`edition ${edition}: ${keep.join(", ")} -> ${out} (content: ${left.join(", ")})`);
