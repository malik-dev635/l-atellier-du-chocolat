/**
 * Capture d'inspection : pilote le Chrome installé en headless, PARCOURT la
 * page pour déclencher réellement les ScrollTriggers, puis enregistre le pli
 * du Hero et une capture pleine page.
 *
 * Usage : node scripts/shoot.mjs [largeur] [hauteur] [suffixe]
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = process.env.SHOOT_URL ?? "http://localhost:3210/";
const WIDTH = Number(process.argv[2] ?? 1440);
const HEIGHT = Number(process.argv[3] ?? 900);
const TAG = process.argv[4] ?? `${WIDTH}x${HEIGHT}`;
const OUT = process.env.SHOOT_OUT ?? "shots";

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1", "--disable-gpu"],
});

const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "load", timeout: 90000 });

// Le pli, une fois l'intro terminée.
await new Promise((r) => setTimeout(r, 6000));
await page.screenshot({ path: `${OUT}/fold-${TAG}.png` });

// Parcours réel : chaque palier laisse le temps aux ScrollTriggers de se
// déclencher et aux tweens de se terminer. Sans cela, une capture fullPage
// photographie des sections dont la révélation n'a jamais été armée.
await page.evaluate(async () => {
  const lenis = window.__adcLenis;
  const step = Math.round(window.innerHeight * 0.55);
  const max = document.documentElement.scrollHeight;
  for (let y = 0; y <= max; y += step) {
    if (lenis && typeof lenis.scrollTo === "function") lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 320));
  }
  if (lenis && typeof lenis.scrollTo === "function") lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 800));
});

// Le hero défile tout seul : on le fige sur la première diapositive (le
// survol met l'autoplay en pause) pour que les captures restent cohérentes.
await page.evaluate(() => {
  // Le focus dans le hero met l'autoplay en pause (onFocusCapture côté React).
  const tab = document.querySelector('#hero [role="tab"][aria-label^="Diapositive 1"]');
  tab?.focus();
  tab?.click();
});
await new Promise((r) => setTimeout(r, 2500));

const height = await page.evaluate(() => document.documentElement.scrollHeight);
await page.screenshot({ path: `${OUT}/full-${TAG}.png`, fullPage: true });

// Ce qui reste invisible APRÈS le parcours est un vrai défaut, pas un artefact.
const stuck = await page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll("main *, footer *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const hiddenByOpacity = Number.parseFloat(cs.opacity) < 0.05;
    const m = cs.transform.match(/matrix\([^)]*?,\s*([-\d.]+),\s*([-\d.]+)\)$/);
    const shifted = m ? Math.abs(Number.parseFloat(m[2])) > 20 : false;
    if (hiddenByOpacity || shifted) {
      out.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 46),
        text: (el.textContent || "").trim().slice(0, 34),
        opacity: cs.opacity,
        transform: cs.transform.slice(0, 48),
      });
    }
    if (out.length > 25) break;
  }
  return out;
});

console.log(`${TAG} — page ${WIDTH}x${height}`);
if (errors.length) console.log("ERREURS JS :", errors.slice(0, 5));
console.log(`Éléments encore masqués après parcours : ${stuck.length}`);
for (const s of stuck) {
  console.log(`  <${s.tag}> op=${s.opacity} tr=${s.transform}`);
  console.log(`      cls=${s.cls}  txt="${s.text}"`);
}

await browser.close();
