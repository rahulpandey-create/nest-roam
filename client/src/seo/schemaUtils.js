import seoConfig from "./seoConfig.json";
import { buildStructuredData as buildSchemaGraph } from "./schemaBuilder";

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
  return buildSchemaGraph(normalizeSeoPath(pathname), seoConfig);
}

export const absoluteUrl = (path) => new URL(path, `${seoConfig.site.url}/`).toString();
export { seoConfig };
