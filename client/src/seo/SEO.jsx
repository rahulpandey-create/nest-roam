import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildStructuredData, getSeoPage, isSeoPath, normalizeSeoPath, seoConfig } from "./schemaUtils";
import { API } from "../admin/adminApi";

const siteIndexable = import.meta.env.VITE_SITE_INDEXABLE === "true";

function upsertMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector);
  if (content == null || content === "") {
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
  if (!url) { element?.remove(); return; }
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
}

function setStructuredData(schema) {
  const id = "nestroam-structured-data";
  let element = document.getElementById(id);
  if (!schema) { element?.remove(); return; }
  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(schema);
}

function updateStructuredData(pathname) {
  setStructuredData(buildStructuredData(pathname));
}

function absoluteImage(path) {
  if (!path) return `${seoConfig.site.url}${seoConfig.site.ogImage}`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${API}${path.startsWith("/") ? path : `/${path}`}`;
}

function blogSchema(blog, canonicalUrl) {
  const organizationId = `${seoConfig.site.url}/#organization`;
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: seoConfig.site.name,
      url: seoConfig.site.url,
      logo: { "@type": "ImageObject", url: `${seoConfig.site.url}${seoConfig.site.logo}` },
    },
    {
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.meta_description || blog.excerpt || "",
      image: [absoluteImage(blog.featured_image)],
      datePublished: blog.published_at || blog.created_at,
      dateModified: blog.updated_at || blog.published_at || blog.created_at,
      author: { "@type": "Person", name: blog.author_name || "Nestroam Holidays" },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      articleSection: blog.category || "Travel Guides",
      keywords: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: seoConfig.site.url },
        { "@type": "ListItem", position: 2, name: "Travel Blog", item: `${seoConfig.site.url}/blogs` },
        { "@type": "ListItem", position: 3, name: blog.title, item: canonicalUrl },
      ],
    },
  ];
  return { "@context": "https://schema.org", "@graph": graph };
}

function updateSocialMeta({ title, description, canonicalUrl, image, type = "website" }) {
  upsertMeta('meta[property="og:type"]', { property: "og:type" }, type);
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, seoConfig.site.name);
  upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
  upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
  upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
  upsertMeta('meta[property="og:image"]', { property: "og:image" }, image);
  upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, title);
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, image);
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    let active = true;
    if (pathname.startsWith("/admin")) {
      const isLoginPage = pathname === "/admin/login";
      document.title = isLoginPage ? "Admin Login | Nestroam Holidays" : "Content Management | Nestroam Holidays";
      upsertMeta('meta[name="robots"]', { name: "robots" }, "noindex, nofollow");
      upsertCanonical(null);
      updateStructuredData(pathname);
      return () => { active = false; };
    }

    const normalizedPath = normalizeSeoPath(pathname);
    const blogMatch = normalizedPath.match(/^\/blogs\/([^/]+)$/);
    if (blogMatch) {
      document.title = "Travel Article | Nestroam Holidays";
      upsertMeta('meta[name="robots"]', { name: "robots" }, siteIndexable ? "index, follow" : "noindex, follow");
      updateSocialMeta({
        title: document.title,
        description: "Travel stories and destination inspiration from Nestroam Holidays.",
        canonicalUrl: `${seoConfig.site.url}${normalizedPath}`,
        image: `${seoConfig.site.url}${seoConfig.site.ogImage}`,
        type: "article",
      });
      upsertCanonical(`${seoConfig.site.url}${normalizedPath}`);
      setStructuredData(null);
      fetch(`${API}/api/blogs/${encodeURIComponent(blogMatch[1])}`)
        .then(async (response) => {
          const result = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(result.message || "Article not found");
          return result.blog;
        })
        .then((blog) => {
          if (!active) return;
          const title = blog.meta_title || `${blog.title} | Nestroam Holidays`;
          const description = blog.meta_description || blog.excerpt || "Read this travel article from Nestroam Holidays.";
          const canonicalUrl = `${seoConfig.site.url}/blogs/${blog.slug}`;
          const image = absoluteImage(blog.featured_image);
          document.title = title;
          upsertMeta('meta[name="description"]', { name: "description" }, description);
          upsertMeta('meta[name="robots"]', { name: "robots" }, siteIndexable ? "index, follow" : "noindex, follow");
          updateSocialMeta({ title, description, canonicalUrl, image, type: "article" });
          upsertCanonical(canonicalUrl);
          setStructuredData(blogSchema(blog, canonicalUrl));
        })
        .catch(() => {
          if (!active) return;
          document.title = "Article Not Found | Nestroam Holidays";
          upsertMeta('meta[name="robots"]', { name: "robots" }, "noindex, nofollow");
          upsertCanonical(null);
          setStructuredData(null);
        });
      return () => { active = false; };
    }

    const page = getSeoPage(normalizedPath);
    const knownSeoPath = isSeoPath(normalizedPath);
    const robotsValue = siteIndexable && knownSeoPath ? "index, follow" : "noindex, follow";
    const canonicalUrl = knownSeoPath ? `${seoConfig.site.url}${normalizedPath === "/" ? "/" : normalizedPath}` : null;
    const ogImage = `${seoConfig.site.url}${seoConfig.site.ogImage}`;

    // Dynamic package pages own their metadata after their published record loads.
    if (/^\/tour-packages\/[^/]+$/.test(normalizedPath) && !knownSeoPath) return () => { active = false; };

    document.title = page.title;
    upsertMeta('meta[name="description"]', { name: "description" }, page.description);
    upsertMeta('meta[name="robots"]', { name: "robots" }, robotsValue);
    updateSocialMeta({ title: page.title, description: page.description, canonicalUrl, image: ogImage });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, page.ogImageAlt);
    upsertMeta('meta[property="og:locale"]', { property: "og:locale" }, seoConfig.site.locale);
    upsertCanonical(canonicalUrl);
    updateStructuredData(normalizedPath);

    return () => { active = false; };
  }, [pathname]);

  return null;
}
