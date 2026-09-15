/** Relevé des hauteurs de section et des images hors gabarit. */
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3210/", { waitUntil: "load", timeout: 90000 });
await new Promise((r) => setTimeout(r, 1500));

const report = await page.evaluate(() => {
  const round = (n) => Math.round(n);
  const sections = [...document.querySelectorAll("main > section, main > div, footer")].map((el) => {
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || el.className.split(" ")[0] || "(sans id)",
      top: round(r.top + window.scrollY),
      h: round(r.height),
    };
  });

  const bigImages = [...document.querySelectorAll("img")]
    .map((img) => {
      const r = img.getBoundingClientRect();
      const parent = img.parentElement;
      const pr = parent ? parent.getBoundingClientRect() : null;
      return {
        alt: (img.alt || "(déco)").slice(0, 34),
        w: round(r.width),
        h: round(r.height),
        parentTag: parent ? parent.tagName.toLowerCase() : null,
        parentClass: parent ? parent.className.split(" ").join("|").slice(0, 60) : null,
        parentH: pr ? round(pr.height) : null,
        parentAR: parent ? getComputedStyle(parent).aspectRatio : null,
        parentPos: parent ? getComputedStyle(parent).position : null,
      };
    })
    .filter((i) => i.h > 500);

  return {
    docHeight: round(document.documentElement.scrollHeight),
    sections,
    bigImages,
  };
});

console.log(`Hauteur totale : ${report.docHeight}px\n`);
console.log("SECTIONS");
for (const s of report.sections) console.log(`  ${String(s.h).padStart(6)}px  top ${String(s.top).padStart(6)}  ${s.id}`);
console.log(`\nIMAGES > 500px de haut : ${report.bigImages.length}`);
for (const i of report.bigImages) {
  console.log(`  ${i.w}x${i.h}  parent<${i.parentTag}> h=${i.parentH} ar=${i.parentAR} pos=${i.parentPos}`);
  console.log(`      alt="${i.alt}"  parent.class=${i.parentClass}`);
}

await browser.close();
