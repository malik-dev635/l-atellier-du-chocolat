/** Vérifie que le slider des chocolats change bien de diapositive et de fond. */
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3210/", { waitUntil: "load", timeout: 90000 });
await new Promise((r) => setTimeout(r, 5000));

const read = () =>
  page.evaluate(() => {
    const section = document.querySelector("#chocolats");
    const counter = section?.querySelector('[class*="counter"]');
    return {
      surface: section?.getAttribute("data-surface"),
      bg: section ? getComputedStyle(section).backgroundColor : null,
      counter: counter?.textContent?.trim(),
    };
  });

await page.evaluate(() => {
  const lenis = window.__adcLenis;
  const y = document.querySelector("#chocolats").getBoundingClientRect().top + window.scrollY - 40;
  if (lenis && typeof lenis.scrollTo === "function") lenis.scrollTo(y, { immediate: true });
  else window.scrollTo(0, y);
});
await new Promise((r) => setTimeout(r, 1500));
const before = await read();

for (let i = 0; i < 2; i += 1) {
  await page.click('button[aria-label="Chocolat suivant"]');
  await new Promise((r) => setTimeout(r, 1200));
}
const after = await read();
await page.screenshot({ path: "shots/r-slider-3.png" });

console.log("avant :", before);
console.log("après 2 clics :", after);
console.log(before.surface !== after.surface ? "OK — fond et diapositive changent" : "ÉCHEC — rien ne bouge");
await browser.close();
