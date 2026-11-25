import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { buildStructuredData } from "../src/seo/schemaBuilder.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const distDirectory = path.join(projectDirectory, "dist");
const seoConfig = JSON.parse(
  await readFile(path.join(projectDirectory, "src/seo/seoConfig.json"), "utf8"),
);
const buildEnv = loadEnv("production", projectDirectory, "");

const template = await readFile(path.join(distDirectory, "index.html"), "utf8");
const indexabilitySetting = process.env.VITE_SITE_INDEXABLE ?? buildEnv.VITE_SITE_INDEXABLE;
const siteIndexable = indexabilitySetting !== "false";
const robots = siteIndexable ? "index, follow" : "noindex, follow";
const site = seoConfig.site;
const apiOrigin = (buildEnv.VITE_API_URL || process.env.VITE_API_URL || "https://api.nestroamholidays.com").replace(/\/+$/, "");

if (siteIndexable) {
  try {
    await access(path.join(distDirectory, site.ogImage.replace(/^\//, "")));
  } catch {
    throw new Error(
      `Indexing cannot be enabled until the approved Open Graph image exists at public${site.ogImage}.`,
    );
  }
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

const absoluteUrl = (route) => `${site.url}${route === "/" ? "/" : route}`;

function buildSeoHead(route, page) {
  const canonical = absoluteUrl(route);
  const image = absoluteUrl(site.ogImage);
  const schema = buildStructuredData(route, seoConfig);
  const schemaScript = schema
    ? `<script id="nestroam-structured-data" type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`
    : "";

  return [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(page.ogImageAlt)}" />`,
    `<meta property="og:image:width" content="1400" />`,
    `<meta property="og:image:height" content="893" />`,
    `<meta property="og:locale" content="${escapeHtml(site.locale)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    schemaScript,
  ].filter(Boolean).join("\n    ");
}

const marker = /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/;
if (!marker.test(template)) {
  throw new Error("SEO head markers were not found in index.html.");
}

for (const [route, page] of Object.entries(seoConfig.routes)) {
  const output = template.replace(marker, `<!-- SEO_HEAD_START -->\n    ${buildSeoHead(route, page)}\n    <!-- SEO_HEAD_END -->`);
  const relativeOutput = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const outputPath = path.join(distDirectory, relativeOutput);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, "utf8");
}

// Generate the custom 404 document.
// The server's ErrorDocument directive serves this file with HTTP 404 status.
const notFoundHead = [
  `<title>Page Not Found | ${escapeHtml(site.name)}</title>`,
  `<meta name="description" content="The page you requested could not be found. Explore Nestroam Holidays or contact us for travel enquiries." />`,
  `<meta name="robots" content="noindex, nofollow" />`,
].join("\n    ");

const notFoundDocument = template.replace(
  marker,
  `<!-- SEO_HEAD_START -->\n    ${notFoundHead}\n    <!-- SEO_HEAD_END -->`,
);

await writeFile(
  path.join(distDirectory, "404.html"),
  notFoundDocument,
  "utf8",
);

console.log("Generated custom 404.html.");

const robotsContent = siteIndexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\nSitemap: ${apiOrigin}/api/blogs/sitemap.xml\n`
  : "User-agent: *\nAllow: /\n";
await writeFile(path.join(distDirectory, "robots.txt"), robotsContent, "utf8");

const sitemapPath = path.join(distDirectory, "sitemap.xml");
if (siteIndexable) {
  const sitemapEntries = Object.keys(seoConfig.routes)
    .map((route) => `  <url><loc>${escapeHtml(absoluteUrl(route))}</loc></url>`)
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
  await writeFile(sitemapPath, sitemap, "utf8");
} else {
  await rm(sitemapPath, { force: true });
}

let deploymentHtaccess;
try {
  // Prefer the project's deployment rules when the deployment directory is present.
  deploymentHtaccess = await readFile(
    path.resolve(projectDirectory, "../deployment/.htaccess"),
    "utf8",
  );
} catch {
  // Source ZIPs may contain only the client folder; retain the included SPA fallback.
  deploymentHtaccess = await readFile(
    path.join(projectDirectory, "public/.htaccess"),
    "utf8",
  );
}
await writeFile(path.join(distDirectory, ".htaccess"), deploymentHtaccess, "utf8");

console.log(`Generated ${Object.keys(seoConfig.routes).length} SEO route documents, robots.txt and .htaccess.`);
console.log(`Sitemap: ${siteIndexable ? "generated" : "deferred until indexing is enabled"}.`);
console.log(`Indexing mode: ${siteIndexable ? "index, follow" : "noindex, follow"}.`);