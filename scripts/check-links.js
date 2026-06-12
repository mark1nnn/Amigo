const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const ignoredSchemes = [
  "http://",
  "https://",
  "//",
  "mailto:",
  "tel:",
  "sms:",
  "viber:",
  "whatsapp:",
  "telegram:",
  "javascript:",
  "data:"
];

const walkHtml = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(fullPath);
    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
};

const toPosix = (value) => value.split(path.sep).join("/");

const stripQueryAndHash = (value) => value.split("#")[0].split("?")[0];

const lineNumberFor = (content, index) => content.slice(0, index).split(/\r\n|\r|\n/).length;

const contextFor = (content, index) => (
  content
    .slice(Math.max(0, index - 90), Math.min(content.length, index + 180))
    .replace(/\s+/g, " ")
    .trim()
);

const shouldIgnore = (value) => {
  const lower = value.trim().toLowerCase();
  if (!lower || lower.startsWith("#")) return true;
  if (lower.startsWith("/api/contact")) return true;
  return ignoredSchemes.some((scheme) => lower.startsWith(scheme));
};

const resolveInternalPath = (value, sourceRelativePath) => {
  const cleanValue = stripQueryAndHash(value.trim());
  if (!cleanValue) return null;

  if (cleanValue.startsWith("/")) {
    return path.posix.normalize(cleanValue);
  }

  const sourceDir = path.posix.dirname(`/${toPosix(sourceRelativePath)}`);
  return path.posix.normalize(path.posix.join(sourceDir, cleanValue));
};

const existsForInternalPath = (internalPath) => {
  let decodedPath = internalPath;

  try {
    decodedPath = decodeURIComponent(internalPath);
  } catch {
    return false;
  }

  const publicPath = path.join(publicDir, ...decodedPath.split("/").filter(Boolean));

  if (decodedPath === "/" || decodedPath.endsWith("/")) {
    return fs.existsSync(path.join(publicPath, "index.html"));
  }

  if (fs.existsSync(publicPath)) return true;

  if (!path.posix.extname(decodedPath)) {
    return (
      fs.existsSync(`${publicPath}.html`) ||
      fs.existsSync(path.join(publicPath, "index.html"))
    );
  }

  return false;
};

const problems = [];
const htmlFiles = walkHtml(publicDir);
const attrPattern = /\b(?:href|src)=["']([^"']+)["']/gi;
const hrefPattern = /\bhref=["']([^"']+)["']/gi;
const privateReviewPathPattern = /^\/?(?:en\/|uk\/)?review(?:\.html)?(?:[#?].*)?$/i;

const containsPrivateReviewPath = (value) => {
  const cleanValue = stripQueryAndHash(value.trim()).replace(/^\/+/, "");
  return privateReviewPathPattern.test(cleanValue);
};

const firstMatch = (html, pattern) => {
  const match = html.match(pattern);
  return match ? match[0] : "";
};

htmlFiles.forEach((filePath) => {
  const relativePath = toPosix(path.relative(publicDir, filePath));
  const html = fs.readFileSync(filePath, "utf8");
  let match;

  while ((match = attrPattern.exec(html)) !== null) {
    const rawValue = match[1];
    if (shouldIgnore(rawValue)) continue;

    const internalPath = resolveInternalPath(rawValue, relativePath);
    if (!internalPath) continue;

    if (!existsForInternalPath(internalPath)) {
      problems.push({
        file: `public/${relativePath}`,
        line: lineNumberFor(html, match.index),
        value: rawValue,
        context: contextFor(html, match.index)
      });
    }
  }

  [
    { label: "desktop navigation", markup: firstMatch(html, /<div\b[^>]*\bclass=["'][^"']*\bnav-links\b[^"']*["'][\s\S]*?<\/div>/i) },
    { label: "mobile navigation", markup: firstMatch(html, /<div\b[^>]*\bclass=["'][^"']*\bmobile-links\b[^"']*["'][\s\S]*?<\/div>/i) },
    { label: "footer navigation", markup: firstMatch(html, /<nav\b[^>]*\bclass=["'][^"']*\bfooter-nav\b[^"']*["'][\s\S]*?<\/nav>/i) }
  ].forEach(({ label, markup }) => {
    let hrefMatch;
    while ((hrefMatch = hrefPattern.exec(markup)) !== null) {
      if (containsPrivateReviewPath(hrefMatch[1])) {
        problems.push({
          file: `public/${relativePath}`,
          line: lineNumberFor(html, html.indexOf(hrefMatch[0])),
          value: hrefMatch[1],
          context: `${label} links must not expose private review forms.`
        });
      }
    }
  });

  [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>[^<]*Google[^<]*<\/a>/gi)].forEach((googleLink) => {
    const href = googleLink[1].trim();
    if (!href.startsWith("#") && !/^https:\/\//i.test(href)) {
      problems.push({
        file: `public/${relativePath}`,
        line: lineNumberFor(html, googleLink.index),
        value: href,
        context: "Real Google profile/review links must be external https URLs."
      });
    }
  });
});

if (problems.length) {
  console.error("Broken internal links found:");
  problems.forEach((problem) => {
    console.error(`- ${problem.file}:${problem.line} -> ${problem.value}`);
    console.error(`  ${problem.context}`);
  });
  process.exit(1);
}

console.log(`Link check passed for ${htmlFiles.length} generated HTML file(s).`);
