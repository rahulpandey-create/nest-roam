import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight, CalendarDays, Check, Clock3, MapPin, Mountain, Route, X,
} from "lucide-react";
import TravelEnquiry from "../TravelEnquiry";
import { API } from "../../admin/adminApi";
import { seoConfig } from "../../seo/schemaUtils";

const siteIndexable = import.meta.env.VITE_SITE_INDEXABLE === "true";
const absolute = (path) => new URL(path, `${seoConfig.site.url}/`).toString();

function setMeta(selector, attributes, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, attrValue]) => element.setAttribute(key, attrValue));
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

function setPackageSeo(item, slug) {
  const title = item.meta_title?.trim() || `${item.title} | Nestroam Holidays`;
  const description = item.meta_description?.trim() || item.short_description?.trim() || item.description?.trim() || `Explore ${item.title} with Nestroam Holidays.`;
  const canonical = absolute(`/tour-packages/${encodeURIComponent(slug)}`);
  const image = item.cover_image?.startsWith("http") ? item.cover_image : absolute(item.cover_image || seoConfig.site.ogImage);
  document.title = title;
  setMeta('meta[name="description"]', { name: "description" }, description);
  setMeta('meta[name="robots"]', { name: "robots" }, siteIndexable ? "index, follow" : "noindex, follow");
  setMeta('meta[property="og:type"]', { property: "og:type" }, "website");
  setMeta('meta[property="og:site_name"]', { property: "og:site_name" }, seoConfig.site.name);
  setMeta('meta[property="og:title"]', { property: "og:title" }, title);
  setMeta('meta[property="og:description"]', { property: "og:description" }, description);
  setMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
  setMeta('meta[property="og:image"]', { property: "og:image" }, image);
  setMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
  setMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
  setMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
  setMeta('meta[name="twitter:image"]', { name: "twitter:image" }, image);
  setCanonical(canonical);
}

function setLoadingSeo(slug) {
  document.title = "Tour package | Nestroam Holidays";
  setMeta('meta[name="robots"]', { name: "robots" }, "noindex, follow");
  setCanonical(absolute(`/tour-packages/${encodeURIComponent(slug)}`));
}

export default function DynamicPackage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    setItem(null);
    setError("");
    setLoading(true);
    setLoadingSeo(slug);

    fetch(`${API}/api/packages/${encodeURIComponent(slug)}`)
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        // Redirect if the requested package does not exist.
        if (response.status === 404 || (response.ok && !data.package)) {
          if (active) {
            navigate("/tour-packages", { replace: true });
          }
          return null;
        }

        // Preserve existing error handling for other API errors.
        if (!response.ok) {
          throw new Error(data.message || "Package not found.");
        }

        return data.package;
      })
      .then((data) => {
        if (active && data) {
          setItem(data);
          setPackageSeo(data, slug);
        }
      })
      .catch((fetchError) => {
        if (active) {
          setError(fetchError.message);
          document.title = "Package Not Found | Nestroam Holidays";
          setMeta(
            'meta[name="robots"]',
            { name: "robots" },
            "noindex, follow"
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug, navigate]);

  if (loading) return <main className="grid min-h-[60vh] place-items-center px-5"><p className="text-sm text-slate-500" role="status">Loading tour details…</p></main>;
  if (error || !item) return <main className="grid min-h-[60vh] place-items-center px-5 text-center"><div className="max-w-lg"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#719f18]">Nestroam Holidays</p><h1 className="mt-3 text-3xl font-bold text-[#1d2d50]">Package unavailable</h1><p className="mt-3 text-slate-600">{error || "This tour package could not be found."}</p><Link to="/tour-packages" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1d2d50] px-6 py-3 font-semibold text-white">Browse packages <ArrowRight size={17} /></Link></div></main>;

  const image = item.cover_image?.startsWith("http") ? item.cover_image : `${API}${item.cover_image}`;
  const hasPrice = item.price !== null && item.price !== undefined && item.price !== "" && Number.isFinite(Number(item.price));
  const price = hasPrice ? `₹${Number(item.price).toLocaleString("en-IN")}` : "Price on request";
  const gallery = Array.isArray(item.gallery) ? item.gallery : [];
  const itinerary = Array.isArray(item.itinerary) ? item.itinerary : [];
  const inclusions = Array.isArray(item.inclusions) ? item.inclusions : [];
  const exclusions = Array.isArray(item.exclusions) ? item.exclusions : [];

  return <main className="overflow-hidden bg-white text-[#172b3a]">
    <section className="relative flex min-h-screen items-start overflow-hidden bg-[#101d32]">
      <img src={image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#081c2b]/90 via-[#081c2b]/70 to-[#081c2b]/20" />
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pt-40 pb-16 md:pt-44 md:pb-24 lg:pt-48">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="transition hover:text-white">Home</Link></li><li aria-hidden="true">/</li>
            <li><Link to="/tour-packages" className="transition hover:text-white">Tour packages</Link></li><li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">{item.destination || item.title}</li>
          </ol>
        </nav>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#a8db69]">Explore with Nestroam</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">{item.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{item.short_description || item.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white">
          <span className="flex items-center gap-2"><CalendarDays size={18} className="text-[#a8db69]" />{item.duration || "Flexible duration"}</span>
          <span className="flex items-center gap-2"><MapPin size={18} className="text-[#a8db69]" />{item.destination || "Destination details on enquiry"}</span>
          <span className="flex items-center gap-2"><Route size={18} className="text-[#a8db69]" />Tailored travel experience</span>
        </div>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#package-enquiry" className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-[#172b3a] transition hover:bg-[#a8db69]">Enquire now <ArrowRight size={18} /></a>
          {itinerary.length > 0 && <a href="#itinerary" className="rounded-full border border-white/60 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-[#172b3a]">Explore itinerary</a>}
        </div>
      </div>
    </section>

    <section className="relative z-10 mx-auto -mt-1 max-w-[1280px] px-5 md:-mt-10">
      <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_12px_50px_rgba(23,43,58,0.10)] md:grid-cols-4">
        {[
          { icon: CalendarDays, label: "Duration", value: item.duration || "Flexible" },
          { icon: MapPin, label: "Destination", value: item.destination || "As discussed" },
          { icon: Mountain, label: "Experience", value: "Curated tour" },
          { icon: Clock3, label: "Starting price", value: price },
        ].map(({ icon: Icon, label, value }, index) => <div key={label} className={`flex items-center gap-3 border-gray-100 p-4 sm:p-6 ${index < 2 ? "border-b md:border-b-0" : ""} ${index % 2 === 0 ? "border-r" : ""} ${index === 1 ? "md:border-r" : ""}`}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f1f7e8] text-[#719f18] sm:h-12 sm:w-12"><Icon size={21} /></span>
          <span><span className="block text-xs text-gray-500">{label}</span><span className="mt-1 block text-sm font-bold text-[#172b3a] sm:text-base">{value}</span></span>
        </div>)}
      </div>
    </section>

    <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#719f18]">The experience</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-[#1d2d50] md:text-4xl">About this tour</h2>
          <p className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">{item.description || item.short_description}</p>
        </div>

        {itinerary.length > 0 && <section id="itinerary" className="mt-14 scroll-mt-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#719f18]">Plan your journey</p>
          <h2 className="mt-3 text-3xl font-bold text-[#1d2d50]">Day-wise itinerary</h2>
          <div className="mt-6 space-y-4">{itinerary.map((day, index) => <article key={`${day.day || index}-${day.title}`} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-[100px_1fr] sm:p-6">
            <div className="flex h-fit items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#719f18] sm:flex-col sm:items-start"><span>{day.day || `Day ${index + 1}`}</span><span className="h-px w-8 bg-[#a8db69] sm:w-10" /></div>
            <div><h3 className="text-lg font-bold text-[#1d2d50]">{day.title || `Day ${index + 1}`}</h3>{day.description && <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">{day.description}</p>}</div>
          </article>)}</div>
        </section>}

        {gallery.length > 0 && <section className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#719f18]">Get inspired</p><h2 className="mt-3 text-3xl font-bold text-[#1d2d50]">Tour gallery</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">{gallery.map((src, index) => { const url = src.startsWith("http") ? src : `${API}${src}`; return <img key={`${src}-${index}`} src={url} alt={`${item.title} - view ${index + 1}`} className="h-40 w-full rounded-2xl object-cover sm:h-52" loading="lazy" />; })}</div>
        </section>}

        {(inclusions.length > 0 || exclusions.length > 0) && <section className="mt-14 grid gap-8 rounded-3xl bg-[#f7f9f4] p-6 sm:grid-cols-2 sm:p-8">
          {inclusions.length > 0 && <div><h2 className="text-xl font-bold text-[#1d2d50]">What's included</h2><ul className="mt-5 space-y-3">{inclusions.map((entry, index) => <li key={index} className="flex gap-3 text-sm leading-6 text-slate-600"><Check size={18} className="mt-1 shrink-0 text-[#719f18]" />{entry}</li>)}</ul></div>}
          {exclusions.length > 0 && <div><h2 className="text-xl font-bold text-[#1d2d50]">What's not included</h2><ul className="mt-5 space-y-3">{exclusions.map((entry, index) => <li key={index} className="flex gap-3 text-sm leading-6 text-slate-600"><X size={18} className="mt-1 shrink-0 text-rose-500" />{entry}</li>)}</ul></div>}
        </section>}
      </div>

      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(23,43,58,0.08)] lg:sticky lg:top-8">
        <p className="text-sm text-slate-500">Starting price</p><p className="mt-2 text-3xl font-bold text-[#719f18]">{price}</p><p className="mt-1 text-sm text-slate-500">{hasPrice ? (item.price_label || "per person") : "Contact us for pricing"}</p>
        <div className="my-6 h-px bg-slate-100" />
        <p className="text-sm leading-6 text-slate-600">Share your travel dates and preferences. Our team will help you plan the details.</p>
        <a href="#package-enquiry" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#1d2d50] px-5 py-4 font-semibold text-white transition hover:bg-[#719f18]">Enquire about this tour <ArrowRight size={18} /></a>
        <p className="mt-4 text-center text-xs text-slate-500">No booking or payment required to enquire.</p>
      </aside>
    </section>
    <div id="package-enquiry" className="scroll-mt-24"><TravelEnquiry /></div>
  </main>;
}
