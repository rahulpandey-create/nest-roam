import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, BookOpen, Clock3, CalendarDays } from "lucide-react";
import { API } from "../../admin/adminApi";
import "./blogs.css";

const formatDate = (value) => {
  if (!value) return "Recently published";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recently published" : new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(date);
};
const imageUrl = (path) => !path ? "/og-image.webp" : path.startsWith("http") ? path : `${API}${path}`;

export default function BlogIndex() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams({ page: String(page), limit: "9" });
    if (category) params.set("category", category);
    if (search) params.set("q", search);
    setLoading(true);
    fetch(`${API}/api/blogs?${params.toString()}`)
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || "Unable to load travel articles.");
        return result;
      })
      .then((result) => {
        if (!active) return;
        setBlogs(result.blogs || []);
        setCategories(result.categories || []);
        setPagination(result.pagination || { total: 0, totalPages: 1 });
        setError("");
      })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page, category, search]);

  function submitSearch(event) {
    event.preventDefault();
    setPage(1);
    setSearch(query.trim());
  }

  return (
    <main className="blog-index-page mt-[-50px] md:mt-[-150px]">
      <section className="blog-index-hero">
        <div className="blog-index-hero-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <p className="text-[20px] font-light mb-3 md:mb-1 text-white mt-12 md:mt-20">The Nestroam journal</p>
          <h1 className="fontsylegilda leading-12.5 sm:leading-normal text-white">Stories that take you places.</h1>
          <p className="mt-3 md:mt-1 max-w-xl mx-auto text-[16px] font-light leading-relaxed text-white/90 text-center">Destination inspiration, practical travel advice and stories from the mountains to help plan your next journey.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div><p className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-3">Explore our stories</p><h2 className="mt-2 text-3xl font-semibold text-[#1a2a4c] sm:text-4xl">Travel notes & inspiration</h2><p className="mt-3 max-w-xl text-slate-500">Find ideas for your next escape, whether you're planning a weekend away or a longer mountain adventure.</p></div>
          <form onSubmit={submitSearch} className="flex w-full max-w-md gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
            <label className="flex min-w-0 flex-1 items-center gap-2 pl-2"><Search size={18} className="shrink-0 text-slate-400" /><span className="sr-only">Search blog articles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles…" className="w-full border-0 bg-transparent py-2 text-sm outline-none" /></label>
            <button className="rounded-lg bg-[#1a2a4c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8db828]">Search</button>
          </form>
        </div>

        {categories.length > 0 && <div className="mt-8 flex flex-wrap gap-2"><button onClick={() => { setCategory(""); setPage(1); }} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!category ? "bg-[#1a2a4c] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All articles</button>{categories.map((item) => <button key={item} onClick={() => { setCategory(item); setPage(1); }} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-[#1a2a4c] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{item}</button>)}</div>}

        {error && <p role="alert" className="mt-8 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {loading ? <div className="grid gap-7 pt-10 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-[390px] animate-pulse rounded-2xl bg-slate-100" />)}</div> : blogs.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-slate-50 px-6 py-16 text-center"><BookOpen size={34} className="mx-auto text-slate-300" /><h3 className="mt-4 text-xl font-semibold text-[#1a2a4c]">No articles found</h3><p className="mt-2 text-sm text-slate-500">Try another search or check back soon for new travel stories.</p></div>
        ) : (
          <>
            <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog) => (
                <article key={blog.id} className="blog-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_12px_40px_rgba(20,35,60,.07)]">
                  <Link to={`/blogs/${blog.slug}`} className="relative block aspect-[1.55] overflow-hidden bg-slate-100"><img src={imageUrl(blog.featured_image)} alt={blog.featured_image_alt || blog.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#1a2a4c]">{blog.category || "Travel Guides"}</span></Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6"><div className="flex items-center gap-3 text-xs text-slate-400"><span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />{formatDate(blog.published_at || blog.created_at)}</span><span>·</span><span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{blog.read_time || 1} min read</span></div><h3 className="mt-4 text-xl font-semibold leading-snug text-[#1a2a4c] transition group-hover:text-[#6f9822]"><Link to={`/blogs/${blog.slug}`}>{blog.title}</Link></h3><p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-500">{blog.excerpt}</p><Link to={`/blogs/${blog.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1a2a4c] transition group-hover:gap-3 group-hover:text-[#6f9822]">Read article <ArrowRight size={17} /></Link></div>
                </article>
              ))}
            </div>
            {pagination.totalPages > 1 && <div className="mt-12 flex items-center justify-center gap-3"><button disabled={page <= 1} onClick={() => { setPage((current) => current - 1); window.scrollTo({ top: 500, behavior: "smooth" }); }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 disabled:opacity-40">Previous</button><span className="text-sm text-slate-500">Page {page} of {pagination.totalPages}</span><button disabled={page >= pagination.totalPages} onClick={() => { setPage((current) => current + 1); window.scrollTo({ top: 500, behavior: "smooth" }); }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 disabled:opacity-40">Next</button></div>}
          </>
        )}
      </section>

      <section className="bg-[#f4f6ef] px-5 py-16 sm:px-8"><div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"><div><p className="inline-flex items-center justify-center bg-[#8fc31f] text-[#1d2d50] text-[14px] font-semibold px-8 py-2 rounded-full mb-4 md:mb-3">Ready for your own story?</p><h2 className="mt-2 text-2xl font-semibold text-[#1a2a4c] sm:text-3xl">Let's plan your next mountain escape.</h2></div><Link to="/tour-packages" className="inline-flex items-center gap-2 rounded-full bg-[#1a2a4c] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8db828]">Explore tour packages <ArrowRight size={17} /></Link></div></section>
    </main>
  );
}
