const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const functionsContact = path.join(rootDir, "functions", "api", "contact.js");

const requiredFiles = [
  "index.html",
  "en/index.html",
  "uk/index.html",
  "services.html",
  "en/services.html",
  "uk/services.html",
  "blog.html",
  "en/blog.html",
  "uk/blog.html",
  "reviews.html",
  "en/reviews.html",
  "uk/reviews.html",
  "review.html",
  "en/review.html",
  "uk/review.html"
];

const publicReviewPages = new Set(["reviews.html", "en/reviews.html", "uk/reviews.html"]);
const privateReviewPages = new Set(["review.html", "en/review.html", "uk/review.html"]);

const walkHtml = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(fullPath);
    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
};

const toPosix = (value) => value.split(path.sep).join("/");
const problems = [];

requiredFiles.forEach((relativePath) => {
  if (!fs.existsSync(path.join(publicDir, relativePath))) {
    problems.push(`Missing required generated file: public/${relativePath}`);
  }
});

const htmlFiles = walkHtml(publicDir);

if (htmlFiles.length === 0) {
  problems.push("No generated HTML files found in public/.");
}

htmlFiles.forEach((filePath) => {
  const publicRelativePath = toPosix(path.relative(publicDir, filePath));
  const relativePath = `public/${publicRelativePath}`;
  const html = fs.readFileSync(filePath, "utf8");

  if (/@include/i.test(html)) {
    problems.push(`${relativePath}: contains an unresolved @include comment.`);
  }

  if (!/<header\b[^>]*\bid=["']site-header["'][^>]*>/i.test(html)) {
    problems.push(`${relativePath}: missing site header markup.`);
  }

  if (!/<footer\b[^>]*\bclass=["'][^"']*\bfooter-premium\b[^"']*["'][^>]*>/i.test(html)) {
    problems.push(`${relativePath}: missing footer markup.`);
  }

  if (/\b(?:href|src)=["'][^"']*src\//i.test(html)) {
    problems.push(`${relativePath}: contains a reference to src/.`);
  }

  if (/\b(?:href|src)=["'][^"']*\/?components\//i.test(html)) {
    problems.push(`${relativePath}: contains a reference to public/components.`);
  }

  if (/fetch\(\s*["']\/?components\//i.test(html)) {
    problems.push(`${relativePath}: uses client-side component fetch.`);
  }

  const robotsMeta = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/i)?.[0] || "";
  if (privateReviewPages.has(publicRelativePath) && !/content=["'][^"']*\bnoindex\b[^"']*\bnofollow\b/i.test(robotsMeta)) {
    problems.push(`${relativePath}: private review form must contain meta robots noindex, nofollow.`);
  }

  if (publicReviewPages.has(publicRelativePath) && /\bnoindex\b/i.test(robotsMeta)) {
    problems.push(`${relativePath}: public reviews page must remain indexable.`);
  }
});

if (!fs.existsSync(functionsContact)) {
  problems.push("functions/api/contact.js is missing.");
}

if (problems.length) {
  console.error("Build check failed:");
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

console.log(`Build check passed for ${htmlFiles.length} generated HTML file(s).`);
