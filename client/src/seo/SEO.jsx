import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildStructuredData, getSeoPage, isSeoPath, normalizeSeoPath, seoConfig } from "./schemaUtils";

const siteIndexable = import.meta.env.VITE_SITE_INDEXABLE === "true";

function upsertMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector);

  if (content == null) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!url) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}

function updateStructuredData(pathname) {
  const id = "nestroam-structured-data";
  const schema = buildStructuredData(pathname);
  let element = document.getElementById(id);

  if (!schema) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      const isLoginPage = pathname === "/admin/login";

      document.title = isLoginPage
        ? "Admin Login | Nestroam Holidays"
        : "Package Management | Nestroam Holidays";

      upsertMeta(
        'meta[name="robots"]',
        { name: "robots" },
        "noindex, nofollow",
      );

      upsertCanonical(null);
      updateStructuredData(pathname);
      return;
    }
    const normalizedPath = normalizeSeoPath(pathname);
    // Dynamic package pages own their metadata after their published record loads.
    // Do not briefly overwrite their title with the static 404 fallback.
    if (/^\/tour-packages\/[^/]+$/.test(normalizedPath) && !isSeoPath(normalizedPath)) return;
    const page = getSeoPage(normalizedPath);
    const robotsValue = siteIndexable && isSeoPath(normalizedPath) ? "index, follow" : "noindex, follow";
    const knownSeoPath = isSeoPath(normalizedPath);
    const canonicalUrl = knownSeoPath
      ? `${seoConfig.site.url}${normalizedPath === "/" ? "/" : normalizedPath}`
      : null;
    const ogImage = `${seoConfig.site.url}${seoConfig.site.ogImage}`;

    document.title = page.title;

    upsertMeta('meta[name="description"]', { name: "description" }, page.description);
    upsertMeta('meta[name="robots"]', { name: "robots" }, robotsValue);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, seoConfig.site.name);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, page.title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, page.description);
    upsertMeta(
      'meta[property="og:url"]',
      { property: "og:url" },
      canonicalUrl,
    );
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, ogImage);
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, page.ogImageAlt);
    upsertMeta('meta[property="og:locale"]', { property: "og:locale" }, seoConfig.site.locale);
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, page.title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, page.description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, ogImage);
    upsertCanonical(canonicalUrl);
    updateStructuredData(normalizedPath);
  }, [pathname]);

  return null;
}
