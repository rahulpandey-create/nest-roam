import { Link } from "react-router-dom";
import { getSeoPage } from "./schemaUtils";

export default function Breadcrumbs({ pagePath, className = "mb-2" }) {
  const items = getSeoPage(pagePath).breadcrumbs;
  if (!items?.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={`text-white/80 text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isCurrent ? (
                <span aria-current="page" className="text-white">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="transition-colors hover:text-white">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
