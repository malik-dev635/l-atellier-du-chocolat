/** Ouvre une page du serveur de dev et remonte les erreurs console / runtime. */
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.env.PROBE_URL ?? "http://localhost:3333/boutique";
const WIDTH = Number(process.argv[2] ?? 1366);
const HEIGHT = Number(process.argv[3] ?? 768);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "shell",
  args: ["--disable-gpu", "--hide-scrollbars"],
});
const page = await browser.newPage();
const issues = [];
page.on("pageerror", (e) => issues.push("PAGEERROR " + e.message));
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") {
    issues.push(m.type().toUpperCase() + " " + m.text().slice(0, 400));
  }
});
await page.setViewport({ width: WIDTH, height: HEIGHT });
await page.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });
await new Promise((r) => setTimeout(r, 6000));
await page.screenshot({ path: `shots/dev-${WIDTH}.png` });

console.log(`${URL} @ ${WIDTH}x${HEIGHT} — problèmes : ${issues.length}`);
for (const issue of issues.slice(0, 15)) console.log("  ", issue);
await browser.close();
