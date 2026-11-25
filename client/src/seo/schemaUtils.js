import seoConfig from "./seoConfig.json";

const absoluteUrl = (path) => new URL(path, `${seoConfig.site.url}/`).toString();

export function normalizeSeoPath(pathname = "/") {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "").toLowerCase()}`;
}

const fallbackSeoPage = {
  title: "Page Not Found | Nestroam Holidays",
  description: "The requested page could not be found on Nestroam Holidays.",
  ogImageAlt: "Nestroam Holidays",
};

export function getSeoPage(pathname = "/") {
  const normalizedPath = normalizeSeoPath(pathname);
  return seoConfig.routes[normalizedPath] || fallbackSeoPage;
}

export function isSeoPath(pathname = "/") {
  return Object.prototype.hasOwnProperty.call(seoConfig.routes, normalizeSeoPath(pathname));
}

export function buildStructuredData(pathname = "/") {
  const normalizedPath = normalizeSeoPath(pathname);
  if (!isSeoPath(normalizedPath)) return null;
  const page = getSeoPage(normalizedPath);
  const graph = [];
  const organizationId = `${seoConfig.site.url}/#organization`;

  // Publish the same Organization entity on every page so page-level
  // Service and Breadcrumb nodes can consistently reference it.
  graph.push({
    "@type": "Organization",
    "@id": organizationId,
    name: seoConfig.site.name,
    url: seoConfig.site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(seoConfig.site.logo),
      width: 238,
      height: 236,
    },
    email: seoConfig.site.email,
    telephone: seoConfig.site.telephone,
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "customer enquiries",
      email: seoConfig.site.email,
      telephone: seoConfig.site.telephone,
      areaServed: "IN",
      availableLanguage: "English",
    }],
    areaServed: {
      "@type": "AdministrativeArea",
      name: seoConfig.site.areaServed,
    },
  });

  if (page.schemaTypes?.includes("website")) {
    graph.push({
      "@type": "WebSite",
      "@id": `${seoConfig.site.url}/#website`,
      name: seoConfig.site.name,
      url: seoConfig.site.url,
      publisher: { "@id": organizationId },
      inLanguage: "en-IN",
    });
  }

  if (page.service) {
    graph.push({
      "@type": "Service",
      "@id": `${seoConfig.site.url}${normalizedPath}#service`,
      name: page.service.name,
      serviceType: page.service.serviceType,
      provider: { "@id": organizationId },
      areaServed: {
        "@type": "AdministrativeArea",
        name: seoConfig.site.areaServed,
      },
    });
  }

  if (page.breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${seoConfig.site.url}${normalizedPath}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  if (!graph.length) return null;

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export { seoConfig, absoluteUrl };
