/**
 * Shared JSON-LD builder used by both the browser and the static SEO-page
 * generator. Keeping one implementation prevents crawler HTML and client
 * navigation from publishing different structured data.
 */

const DESTINATIONS = [
  { name: "Manali", path: "/destinations/manali" },
  { name: "Shimla", path: "/destinations/shimla" },
  { name: "Kasol", path: "/destinations/kasol" },
  { name: "Spiti Valley", path: "/destinations/spiti" },
  { name: "Mcleod Ganj", path: "/destinations/mcleod-ganj" },
  { name: "Dharamshala", path: "/destinations/dharamshala" },
];

const TOUR_PACKAGES = [
  {
    name: "Manali Mountain Escape",
    path: "/tour-packages/manali",
    destination: "Manali",
  },
  {
    name: "Shimla & Kufri Retreat",
    path: "/tour-packages/shimla",
    destination: "Shimla",
    price: 12999,
  },
  {
    name: "Kasol Valley Getaway",
    path: "/tour-packages/kasol",
    destination: "Kasol",
  },
  {
    name: "Spiti Valley Expedition",
    path: "/tour-packages/spiti",
    destination: "Spiti Valley",
  },
];

const normalizePath = (pathname = "/") => {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "").toLowerCase()}`;
};

const absoluteUrl = (path, siteUrl) => new URL(path || "/", `${siteUrl.replace(/\/$/, "")}/`).toString();

const listNode = (id, name, entries, siteUrl, asTrips = false) => ({
  "@type": "ItemList",
  "@id": id,
  name,
  itemListElement: entries.map((entry, index) => {
    const url = absoluteUrl(entry.path, siteUrl);
    const listItem = {
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
    };
    if (asTrips) {
      listItem.item = {
        "@type": "TouristTrip",
        name: entry.name,
        url,
      };
    } else {
      listItem.url = url;
    }
    return listItem;
  }),
});

/** Build one JSON-LD graph for a known route. */
export function buildStructuredData(pathname = "/", config) {
  if (!config?.site || !config?.routes) return null;

  const route = normalizePath(pathname);
  const page = config.routes[route];
  if (!page) return null;

  const site = config.site;
  const siteUrl = site.url.replace(/\/$/, "");
  const pageUrl = absoluteUrl(route, siteUrl);
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const pageId = `${pageUrl === `${siteUrl}/` ? siteUrl : pageUrl}#webpage`;
  const imageId = `${pageUrl === `${siteUrl}/` ? siteUrl : pageUrl}#image`;
  const breadcrumbId = `${pageUrl === `${siteUrl}/` ? siteUrl : pageUrl}#breadcrumb`;
  const listId = `${pageUrl === `${siteUrl}/` ? siteUrl : pageUrl}#list`;
  const logoUrl = absoluteUrl(site.logo, siteUrl);
  const imageUrl = absoluteUrl(site.ogImage, siteUrl);
  const graph = [];

  const agency = {
    "@type": "TravelAgency",
    "@id": organizationId,
    name: site.name,
    url: `${siteUrl}/`,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    image: imageUrl,
    description: site.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.areaServed,
    },
  };
  if (site.telephone) agency.telephone = site.telephone;
  if (site.email) agency.email = site.email;
  if (Array.isArray(site.sameAs) && site.sameAs.length) agency.sameAs = site.sameAs;
  if (site.telephone || site.email) {
    agency.contactPoint = [{
      "@type": "ContactPoint",
      contactType: "customer service",
      ...(site.telephone ? { telephone: site.telephone } : {}),
      ...(site.email ? { email: site.email } : {}),
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    }];
  }
  graph.push(agency);

  graph.push({
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteUrl}/`,
    name: site.name,
    publisher: { "@id": organizationId },
    inLanguage: "en-IN",
  });

  const pageType = page.schemaType === "destinationCollection" ||
    page.schemaType === "packageCollection"
    ? "CollectionPage"
    : page.schemaType === "about"
      ? "AboutPage"
      : page.schemaType === "contact"
        ? "ContactPage"
        : "WebPage";

  const pageNode = {
    "@type": pageType,
    "@id": pageId,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": websiteId },
    primaryImageOfPage: { "@id": imageId },
  };
  if (page.breadcrumbs?.length) pageNode.breadcrumb = { "@id": breadcrumbId };
  graph.push(pageNode);

  graph.push({
    "@type": "ImageObject",
    "@id": imageId,
    url: imageUrl,
    contentUrl: imageUrl,
    width: 1400,
    height: 893,
    caption: page.ogImageAlt || `${site.name} - Himachal Pradesh travel`,
  });

  if (page.schemaType === "home") {
    const destinations = listNode(
      `${siteUrl}/#destinations`,
      "Himachal Pradesh destinations",
      DESTINATIONS,
      siteUrl,
    );
    graph.push(destinations);
    pageNode.mainEntity = { "@id": destinations["@id"] };
  }

  if (page.schemaType === "destinationCollection") {
    const destinations = listNode(
      listId,
      "Himachal Pradesh destinations",
      DESTINATIONS,
      siteUrl,
    );
    graph.push(destinations);
    pageNode.mainEntity = { "@id": listId };
  }

  if (page.schemaType === "destination") {
    const destinationId = `${pageUrl}#destination`;
    graph.push({
      "@type": "TouristDestination",
      "@id": destinationId,
      name: page.entityName,
      url: pageUrl,
      description: page.description,
      image: { "@id": imageId },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Himachal Pradesh",
        containedInPlace: { "@type": "Country", name: "India" },
      },
    });
    pageNode.about = { "@id": destinationId };
  }

  if (page.schemaType === "packageCollection") {
    const packages = listNode(
      listId,
      "Himachal Pradesh tour packages",
      TOUR_PACKAGES,
      siteUrl,
      true,
    );
    graph.push(packages);
    pageNode.mainEntity = { "@id": listId };
  }

  if (page.schemaType === "tourPackage") {
    const tripId = `${pageUrl}#trip`;
    const destinationPath = `/destinations/${page.destinationSlug}`;
    const destinationUrl = absoluteUrl(destinationPath, siteUrl);
    const destinationId = `${destinationUrl}#destination`;
    const destinationPage = config.routes[destinationPath];

    // Reuse the same destination @id used by the destination's own page.
    graph.push({
      "@type": "TouristDestination",
      "@id": destinationId,
      name: page.destinationName,
      url: destinationUrl,
      ...(destinationPage?.description ? { description: destinationPage.description } : {}),
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Himachal Pradesh",
        containedInPlace: { "@type": "Country", name: "India" },
      },
    });

    const trip = {
      "@type": "TouristTrip",
      "@id": tripId,
      name: page.entityName,
      url: pageUrl,
      description: page.description,
      image: { "@id": imageId },
      provider: { "@id": organizationId },
      touristDestination: { "@id": destinationId },
    };
    // Only add a price when the corresponding package page visibly displays it.
    if (Number.isFinite(page.visiblePrice)) {
      trip.offers = {
        "@type": "Offer",
        price: page.visiblePrice,
        priceCurrency: "INR",
      };
    }
    graph.push(trip);
    pageNode.about = { "@id": tripId };
  }

  if (page.schemaType === "service") {
    const serviceId = `${pageUrl}#service`;
    graph.push({
      "@type": "Service",
      "@id": serviceId,
      name: page.serviceName,
      serviceType: page.serviceType,
      url: pageUrl,
      description: page.description,
      provider: { "@id": organizationId },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Himachal Pradesh",
      },
    });
    pageNode.mainEntity = { "@id": serviceId };
  }

  if (page.schemaType === "about") {
    pageNode.mainEntity = { "@id": organizationId };
  }

  if (page.schemaType === "contact") {
    pageNode.mainEntity = { "@id": organizationId };
  }

  if (page.breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: page.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path, siteUrl),
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
