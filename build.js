const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const srcPagesDir = path.join(rootDir, "src", "pages");
const srcComponentsDir = path.join(rootDir, "src", "components");
const publicDir = path.join(rootDir, "public");
const siteOrigin = "https://amigostudio.pl";
const languages = ["pl", "uk", "en"];

const readUtf8 = (filePath) => fs.readFileSync(filePath, "utf8");
const writeUtf8 = (filePath, contents) => fs.writeFileSync(filePath, contents, "utf8");

const toPosix = (value) => value.split(path.sep).join("/");

const walkFiles = (dir, extension) => {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath, extension));
      return;
    }

    if (!extension || entry.name.endsWith(extension)) {
      files.push(fullPath);
    }
  });

  return files.sort((a, b) => a.localeCompare(b));
};

const parseAttributes = (tag) => {
  const attributes = {};
  const attrPattern = /([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
  let match;

  while ((match = attrPattern.exec(tag)) !== null) {
    attributes[match[1].toLowerCase()] = match[3] ?? match[4] ?? "";
  }

  return attributes;
};

const siteUrlToPath = (href) => {
  if (!href) return "/";

  try {
    const url = new URL(href, siteOrigin);
    if (url.origin !== siteOrigin) return href;
    return `${url.pathname}${url.search}${url.hash}` || "/";
  } catch {
    return href.startsWith("/") ? href : `/${href}`;
  }
};

const getPageLanguage = (html) => {
  const bodyLanguage = html.match(/<body\b[^>]*\bdata-language=["']([^"']+)["']/i)?.[1];
  const htmlLanguage = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1];
  const language = (bodyLanguage || htmlLanguage || "pl").toLowerCase();

  return language === "ua" ? "uk" : language;
};

const getPageKey = (html, relativePath) => {
  const explicitPage = html.match(/<body\b[^>]*\bdata-page=["']([^"']+)["']/i)?.[1];
  if (explicitPage) return explicitPage;

  const normalized = toPosix(relativePath);
  if (normalized.endsWith("index.html")) return "home";
  if (normalized.includes("/blog/") || normalized === "blog.html" || normalized.endsWith("/blog.html")) return "blog";

  return path.basename(normalized, ".html");
};

const inferAlternatePaths = (relativePath) => {
  const normalized = toPosix(relativePath);
  const parts = normalized.split("/");
  const firstPart = parts[0];
  const sourceLanguage = languages.includes(firstPart) ? firstPart : "pl";
  const sourceRelative = sourceLanguage === "pl" ? normalized : parts.slice(1).join("/");
  const withoutHtml = sourceRelative.replace(/\.html$/i, "");
  const cleanSource = withoutHtml === "index" ? "" : withoutHtml;

  const makePath = (language) => {
    const prefix = language === "pl" ? "" : `/${language}`;
    if (!cleanSource) return `${prefix}/` || "/";
    return `${prefix}/${cleanSource}`;
  };

  return {
    pl: makePath("pl"),
    uk: makePath("uk"),
    en: makePath("en"),
    current: makePath(sourceLanguage)
  };
};

const getAlternatePaths = (html, relativePath) => {
  const alternates = inferAlternatePaths(relativePath);
  const linkPattern = /<link\b[^>]*>/gi;
  let match;

  while ((match = linkPattern.exec(html)) !== null) {
    const attrs = parseAttributes(match[0]);
    const rel = (attrs.rel || "").toLowerCase().split(/\s+/);
    const hreflang = (attrs.hreflang || "").toLowerCase();

    if (!rel.includes("alternate") || !languages.includes(hreflang)) continue;
    alternates[hreflang] = siteUrlToPath(attrs.href);
  }

  return alternates;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const markActiveNavigation = (componentHtml, pageKey) => {
  if (!pageKey) return componentHtml;

  const activeLinkPattern = new RegExp(
    `(<a\\b(?=[^>]*\\bdata-page-link=["']${escapeRegExp(pageKey)}["'])(?![^>]*\\baria-current=)[^>]*)(>)`,
    "gi"
  );

  return componentHtml.replace(activeLinkPattern, '$1 aria-current="page"$2');
};

const renderComponent = (componentName, context) => {
  const componentPath = path.join(srcComponentsDir, componentName);

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Missing component: ${path.relative(rootDir, componentPath)}`);
  }

  let componentHtml = readUtf8(componentPath);
  const replacements = {
    "{{LANG_PL_URL}}": context.alternates.pl,
    "{{LANG_UK_URL}}": context.alternates.uk,
    "{{LANG_EN_URL}}": context.alternates.en
  };

  Object.entries(replacements).forEach(([token, value]) => {
    componentHtml = componentHtml.split(token).join(value);
  });

  return markActiveNavigation(componentHtml, context.pageKey);
};

const renderPage = (sourcePath) => {
  const relativePath = toPosix(path.relative(srcPagesDir, sourcePath));
  const sourceHtml = readUtf8(sourcePath);
  const context = {
    language: getPageLanguage(sourceHtml),
    pageKey: getPageKey(sourceHtml, relativePath),
    alternates: getAlternatePaths(sourceHtml, relativePath)
  };

  let includeCount = 0;
  const renderedHtml = sourceHtml.replace(/<!--\s*@include\s+([a-z0-9._-]+\.html)\s*-->/gi, (_match, componentName) => {
    includeCount += 1;
    return renderComponent(componentName, context);
  });

  if (includeCount === 0) {
    throw new Error(`No include comments found in ${path.relative(rootDir, sourcePath)}`);
  }

  if (/@include/i.test(renderedHtml)) {
    throw new Error(`Unresolved include comment in ${path.relative(rootDir, sourcePath)}`);
  }

  return { relativePath, renderedHtml };
};

const removeGeneratedHtml = () => {
  walkFiles(publicDir, ".html").forEach((filePath) => {
    fs.rmSync(filePath);
  });
};

const build = () => {
  if (!fs.existsSync(srcPagesDir)) {
    throw new Error("Missing src/pages. Create page templates before running the build.");
  }

  if (!fs.existsSync(srcComponentsDir)) {
    throw new Error("Missing src/components. Create reusable components before running the build.");
  }

  const pages = walkFiles(srcPagesDir, ".html");
  if (pages.length === 0) {
    throw new Error("No HTML templates found in src/pages.");
  }

  fs.mkdirSync(publicDir, { recursive: true });
  removeGeneratedHtml();

  pages.forEach((pagePath) => {
    const { relativePath, renderedHtml } = renderPage(pagePath);
    const outputPath = path.join(publicDir, relativePath);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    writeUtf8(outputPath, renderedHtml);
    console.log(`Generated public/${relativePath}`);
  });

  console.log(`Generated ${pages.length} HTML file(s).`);
};

try {
  build();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
