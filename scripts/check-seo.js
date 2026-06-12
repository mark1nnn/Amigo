const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const robotsPath = path.join(publicDir, "robots.txt");
const intentionalNoindex = new Set(["review.html", "en/review.html", "uk/review.html"]);
const privateReviewPages = new Set(["review.html", "en/review.html", "uk/review.html"]);
const publicReviewPages = new Set(["reviews.html", "en/reviews.html", "uk/reviews.html"]);

const walkHtml = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(fullPath);
    return entry.name.endsWith(".html") ? [fullPath] : [];
  });
};

const toPosix = (value) => value.split(path.sep).join("/");

const parseAttributes = (tag) => {
  const attributes = {};
  const attrPattern = /([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let match;

  while ((match = attrPattern.exec(tag)) !== null) {
    attributes[match[1].toLowerCase()] = match[3] ?? match[4] ?? "";
  }

  return attributes;
};

const hasUnsafeSeoUrl = (value) => {
  const lower = value.toLowerCase();
  return (
    lower.includes("localhost") ||
    lower.includes("pages.dev") ||
    lower.includes("workers.dev") ||
    lower.includes("/src/")
  );
};

const problems = [];
const htmlFiles = walkHtml(publicDir);

htmlFiles.forEach((filePath) => {
  const relativePath = toPosix(path.relative(publicDir, filePath));
  const html = fs.readFileSync(filePath, "utf8");
  const allowNoindex = intentionalNoindex.has(relativePath);

  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(html)) {
    problems.push(`public/${relativePath}: missing html lang.`);
  }

  if (!/<title>[\s\S]*?<\/title>/i.test(html)) {
    problems.push(`public/${relativePath}: missing title.`);
  }

  if (!/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["'][^"']+["'][^>]*>/i.test(html)) {
    problems.push(`public/${relativePath}: missing meta description.`);
  }

  const robotsMeta = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/i)?.[0] || "";
  const robotsContent = parseAttributes(robotsMeta).content || "";
  if (/\bnoindex\b/i.test(robotsContent) && !allowNoindex) {
    problems.push(`public/${relativePath}: contains unexpected noindex.`);
  }

  if (privateReviewPages.has(relativePath) && !/\bnoindex\b/i.test(robotsContent)) {
    problems.push(`public/${relativePath}: private review form must be noindex.`);
  }

  if (privateReviewPages.has(relativePath) && !/\bnofollow\b/i.test(robotsContent)) {
    problems.push(`public/${relativePath}: private review form must be nofollow.`);
  }

  if (publicReviewPages.has(relativePath) && /\bnoindex\b/i.test(robotsContent)) {
    problems.push(`public/${relativePath}: reviews page must remain indexable.`);
  }

  const canonicalTag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
  const canonicalHref = canonicalTag ? parseAttributes(canonicalTag).href : "";
  if (!allowNoindex && !canonicalHref) {
    problems.push(`public/${relativePath}: missing canonical link.`);
  }
  if (canonicalHref && hasUnsafeSeoUrl(canonicalHref)) {
    problems.push(`public/${relativePath}: unsafe canonical URL ${canonicalHref}.`);
  }

  const alternateTags = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => parseAttributes(match[0]))
    .filter((attrs) => (attrs.rel || "").toLowerCase().split(/\s+/).includes("alternate") && attrs.hreflang);

  if (!allowNoindex && alternateTags.length === 0) {
    problems.push(`public/${relativePath}: missing hreflang alternate links.`);
  }

  alternateTags.forEach((attrs) => {
    if (attrs.href && hasUnsafeSeoUrl(attrs.href)) {
      problems.push(`public/${relativePath}: unsafe hreflang URL ${attrs.href}.`);
    }
  });

  [...html.matchAll(/<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .forEach((match) => {
      try {
        const schema = JSON.parse(match[1].trim());
        const schemaText = JSON.stringify(schema);
        if (/AggregateRating/i.test(schemaText)) {
          problems.push(`public/${relativePath}: must not contain AggregateRating schema for reviews.`);
        }
        if (/"@type":"Review"/i.test(schemaText)) {
          problems.push(`public/${relativePath}: must not contain self-serving Review schema.`);
        }
      } catch (error) {
        problems.push(`public/${relativePath}: invalid JSON-LD (${error.message}).`);
      }
    });
});

if (!fs.existsSync(sitemapPath)) {
  problems.push("public/sitemap.xml is missing.");
} else {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim());
  const requiredUrls = [
    "https://amigostudio.pl/",
    "https://amigostudio.pl/en/",
    "https://amigostudio.pl/uk/",
    "https://amigostudio.pl/services",
    "https://amigostudio.pl/en/services",
    "https://amigostudio.pl/uk/services",
    "https://amigostudio.pl/blog",
    "https://amigostudio.pl/reviews",
    "https://amigostudio.pl/en/reviews",
    "https://amigostudio.pl/uk/reviews"
  ];
  const forbiddenUrls = [
    "https://amigostudio.pl/review",
    "https://amigostudio.pl/en/review",
    "https://amigostudio.pl/uk/review"
  ];

  if (!/<urlset\b/i.test(sitemap)) {
    problems.push("public/sitemap.xml does not contain <urlset>.");
  }

  requiredUrls.forEach((url) => {
    if (!sitemapLocs.includes(url)) {
      problems.push(`public/sitemap.xml is missing ${url}.`);
    }
  });

  forbiddenUrls.forEach((url) => {
    if (sitemapLocs.includes(url)) {
      problems.push(`public/sitemap.xml must not include private review URL ${url}.`);
    }
  });

  if (hasUnsafeSeoUrl(sitemap) || /src\//i.test(sitemap)) {
    problems.push("public/sitemap.xml contains an unsafe preview or src URL.");
  }
}

if (!fs.existsSync(robotsPath)) {
  problems.push("public/robots.txt is missing.");
}

if (problems.length) {
  console.error("SEO check failed:");
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

console.log(`SEO check passed for ${htmlFiles.length} generated HTML file(s).`);
