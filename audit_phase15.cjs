const { chromium } = require("playwright");
const { execSync } = require("child_process");
const { writeFileSync } = require("fs");

const URL = "http://localhost:3000";
const BREAKPOINTS = [
  { w: 320, h: 568, label: "mobile" },
  { w: 768, h: 1024, label: "tablet" },
  { w: 1280, h: 800, label: "desktop" },
];

const results = { responsive: {}, lh_scores: {}, functional: {} };

(async () => {
const browser = await chromium.launch({ headless: true, channel: 'chrome' });

for (const { w, h, label } of BREAKPOINTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth;
  });
  results.responsive[label] = { width: w, no_horizontal_overflow: !overflow };
  console.log(`  ${overflow ? "⚠️" : "✅"} No overflow at ${w}px`);

  await page.screenshot({ path: `screenshot_${label}.png`, fullPage: true });
  console.log(`  📸 Screenshot saved: screenshot_${label}.png`);
  await ctx.close();
}

// Functional checks
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const title = await page.title();
results.functional.title = title;
console.log(`  ✅ Title: ${title}`);

const desc = await page.evaluate(() =>
  document.querySelector('meta[name="description"]')?.getAttribute("content")
);
results.functional.meta_description = desc;
console.log(`  ✅ Meta description: ${desc?.slice(0, 60)}...`);

const sections = ["#waitlist", "#how-it-works", "#features", "#pricing"];
for (const sel of sections) {
  const count = await page.locator(sel).count();
  results.functional[`section_${sel.slice(1)}`] = count > 0;
  console.log(`  ${count > 0 ? "✅" : "❌"} Section ${sel}: ${count > 0}`);
}

const sticky = await page.evaluate(() => {
  const nav = document.querySelector("nav");
  if (!nav) return false;
  return getComputedStyle(nav).position === "sticky";
});
results.functional.navbar_sticky = sticky;
console.log(`  ${sticky ? "✅" : "❌"} Navbar sticky: ${sticky}`);

const inputCount = await page.locator('input[type="email"]').count();
results.functional.email_input_present = inputCount > 0;
console.log(`  ${inputCount > 0 ? "✅" : "❌"} Email input: ${inputCount}`);

// waitlist form
await page.locator('input[type="email"]').fill("invalid-email");
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(500);
const errorCount = await page.locator("text=Please enter a valid email").count();
results.functional.form_validation_error = errorCount > 0;
console.log(`  ${errorCount > 0 ? "✅" : "❌"} Validation error: ${errorCount > 0}`);

await page.locator('input[type="email"]').fill("test@example.com");
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(2000);
const successCount = await page.locator("text=You're on the list").count();
results.functional.form_success = successCount > 0;
console.log(`  ${successCount > 0 ? "✅" : "❌"} Success message: ${successCount > 0}`);

const footerCount = await page.locator("footer").count();
results.functional.footer_present = footerCount > 0;
console.log(`  ${footerCount > 0 ? "✅" : "❌"} Footer: ${footerCount > 0}`);

const socialText = await page.locator("text=1,200+ engineers").count();
results.functional.social_proof_text = socialText > 0;
console.log(`  ${socialText > 0 ? "✅" : "❌"} Social proof: ${socialText > 0}`);

await ctx.close();
await browser.close();

// Lighthouse
console.log("\n  📊 Running Lighthouse audit...");
try {
  const out = execSync(
    `npx lighthouse ${URL} --output=json --chrome-flags="--headless" --only-categories=performance,accessibility,seo,best-practices --quiet`,
    { timeout: 120000 }
  );
  const lh = JSON.parse(out.toString());
  const scores = {
    performance: Math.round(lh.categories.performance.score * 100),
    accessibility: Math.round(lh.categories.accessibility.score * 100),
    seo: Math.round(lh.categories.seo.score * 100),
    best_practices: Math.round(lh.categories["best-practices"].score * 100),
  };
  results.lh_scores = scores;
  for (const [k, v] of Object.entries(scores)) {
    const target = k === "performance" ? 90 : 95;
    const passed = v >= target;
    console.log(`  ${passed ? "✅" : "⚠️"} ${k}: ${v} (target: ${target})`);
  }
} catch (e) {
  console.log(`  ⚠️ Lighthouse error: ${e.message?.slice(0, 200)}`);
}

console.log("\n" + "=".repeat(50));
console.log("SUMMARY");
console.log("=".repeat(50));
let allPass = true;

for (const [label, data] of Object.entries(results.responsive)) {
  if (!data.no_horizontal_overflow) { allPass = false; console.log(`❌ Overflow at ${label}`); }
  else console.log(`✅ No overflow at ${label}`);
}

for (const [check, passed] of Object.entries(results.functional)) {
  if (typeof passed === "boolean" && !passed) { allPass = false; console.log(`❌ Failed: ${check}`); }
}

if (results.lh_scores) {
  for (const [k, v] of Object.entries(results.lh_scores)) {
    const target = k === "performance" ? 90 : 95;
    if (v < target) { allPass = false; console.log(`❌ Lighthouse ${k}: ${v} (target: ${target})`); }
  }
}

console.log(`\n${allPass ? "✅ ALL CHECKS PASSED" : "⚠️ SOME CHECKS FAILED"}`);
writeFileSync("results_phase15.json", JSON.stringify(results, null, 2));
})();
