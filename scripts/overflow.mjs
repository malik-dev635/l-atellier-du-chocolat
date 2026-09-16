import puppeteer from "puppeteer-core";
const W = Number(process.argv[2] ?? 390), H = Number(process.argv[3] ?? 844);
const b = await puppeteer.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", headless: "shell", args: ["--hide-scrollbars", "--disable-gpu"] });
const p = await b.newPage();
await p.setViewport({ width: W, height: H, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await p.goto("http://localhost:3210/", { waitUntil: "load" });
await new Promise((r) => setTimeout(r, 6000));
const r = await p.evaluate(() => {
  const vw = window.innerWidth;
  const out = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) continue;
    if (rect.width >= 391 && rect.width <= 700 && !(cs.overflowX === "auto" || cs.overflowX === "scroll")) {
      out.push({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 60), left: Math.round(rect.left), right: Math.round(rect.right), w: Math.round(rect.width), pos: cs.position, ov: cs.overflow });
    }
  }
  return { vw, docW: document.documentElement.scrollWidth, bodyW: document.body.scrollWidth, htmlOv: getComputedStyle(document.documentElement).overflowX, bodyOv: getComputedStyle(document.body).overflowX, n: out.length, out: out.slice(0, 60) };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
