import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const distDirectory = path.join(projectDirectory, "dist");
const seoConfig = JSON.parse(
  await readFile(path.join(projectDirectory, "src/seo/seoConfig.json"), "utf8"),
);

const template = await readFile(path.join(distDirectory, "index.html"), "utf8");
const siteIndexable = process.env.VITE_SITE_INDEXABLE === "true";
const robots = siteIndexable ? "index, follow" : "noindex, follow";
const site = seoConfig.site;

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

function buildGraph(route, page) {
  const graph = [];
  const organizationId = `${site.url}/#organization`;

  graph.push({
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(site.logo),
      width: 238,
      height: 236,
    },
    email: site.email,
    telephone: site.telephone,
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "customer enquiries",
      email: site.email,
      telephone: site.telephone,
      areaServed: "IN",
      availableLanguage: "English",
    }],
    areaServed: { "@type": "AdministrativeArea", name: site.areaServed },
  });

  if (page.schemaTypes?.includes("website")) {
    graph.push({
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": organizationId },
      inLanguage: "en-IN",
    });
  }

  if (page.service) {
    graph.push({
      "@type": "Service",
      "@id": `${site.url}${route}#service`,
      name: page.service.name,
      serviceType: page.service.serviceType,
      provider: { "@id": organizationId },
      areaServed: { "@type": "AdministrativeArea", name: site.areaServed },
    });
  }

  if (page.breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${site.url}${route}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  return graph.length ? { "@context": "https://schema.org", "@graph": graph } : null;
}

function buildSeoHead(route, page) {
  const canonical = absoluteUrl(route);
  const image = absoluteUrl(site.ogImage);
  const schema = buildGraph(route, page);
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
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
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
  ? `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
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

const deploymentHtaccess = await readFile(
  path.resolve(projectDirectory, "../deployment/.htaccess"),
  "utf8",
);
await writeFile(path.join(distDirectory, ".htaccess"), deploymentHtaccess, "utf8");

console.log(`Generated ${Object.keys(seoConfig.routes).length} SEO route documents, robots.txt and .htaccess.`);
console.log(`Sitemap: ${siteIndexable ? "generated" : "deferred until indexing is enabled"}.`);
console.log(`Indexing mode: ${siteIndexable ? "index, follow" : "noindex, follow"}.`);
