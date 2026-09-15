/** Sonde l'état réel des éléments animés du Hero au chargement. */
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1", "--disable-gpu"],
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE ERROR:", m.text());
});
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3210/", { waitUntil: "load", timeout: 90000 });
await new Promise((r) => setTimeout(r, 5000));

const state = await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const line = q("[data-hero-line]");
  const center = q('[class*="Hero_center"]');
  const badge = q('[class*="Hero_badge"]');
  const h1 = q("#hero-title");
  const rect = (el) => (el ? { x: Math.round(el.getBoundingClientRect().x), y: Math.round(el.getBoundingClientRect().y), w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height) } : null);
  return {
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
    visibility: document.visibilityState,
    introReady: window.__adcIntroReady ?? null,
    curtainPresent: !!q('[role="status"]'),
    centerRect: rect(center),
    h1Rect: rect(h1),
    h1Text: h1 ? h1.textContent.slice(0, 44) : null,
    lineTransform: line ? getComputedStyle(line).transform : null,
    lineInlineStyle: line ? line.getAttribute("style") : null,
    badgeOpacity: badge ? getComputedStyle(badge).opacity : null,
    badgeRect: rect(badge),
    htmlClass: document.documentElement.className,
    medias: [...document.querySelectorAll("[data-hero-media]")].map((el) => ({
      cls: el.className.split(" ").pop(),
      clip: getComputedStyle(el).clipPath,
      r: rect(el),
    })),
    cta: (() => { const el = document.querySelector('[class*="Hero_cta"]');
      return el ? { op: getComputedStyle(el).opacity, r: rect(el) } : null; })(),
    badgeKids: badge ? [...badge.children].map((el) => ({
      tag: el.tagName, cls: String(el.getAttribute("class")).slice(0, 30),
      r: rect(el), op: getComputedStyle(el).opacity,
      fill: getComputedStyle(el).fill, color: getComputedStyle(el).color,
    })) : null,
    lines: [...document.querySelectorAll("[data-hero-line]")].map((el) => ({
      text: el.textContent,
      scrollW: el.scrollWidth,
      maskW: el.parentElement ? Math.round(el.parentElement.getBoundingClientRect().width) : null,
      fs: getComputedStyle(el).fontSize,
      family: getComputedStyle(el).fontFamily.split(",")[0],
      emPerChar: +(el.scrollWidth / el.textContent.length / parseFloat(getComputedStyle(el).fontSize)).toFixed(3),
    })),
    centerW: center ? Math.round(center.getBoundingClientRect().width) : null,
    mugRight: (() => { const e = document.querySelector('[class*="Hero_mug"]');
      return e ? Math.round(e.getBoundingClientRect().right) : null; })(),
    sphereLeft: (() => { const e = document.querySelector('[class*="Hero_sphere"]');
      return e ? Math.round(e.getBoundingClientRect().left) : null; })(),
    textPathLen: (() => { const t = document.querySelector("textPath");
      return t ? { len: t.textContent.length, href: t.getAttribute("href"),
                   bbox: t.getBBox ? null : null } : null; })(),
  };
});

console.log(JSON.stringify(state, null, 1));
await browser.close();
