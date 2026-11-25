import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, FilePenLine, Eye, Trash2, Plus, BookOpen } from "lucide-react";
import { API, adminRequest } from "./adminApi";

function imageUrl(path) {
  if (!path) return "/og-image.webp";
  return path.startsWith("http") ? path : `${API}${path}`;
}

function formatDate(value) {
  if (!value) return "Not published";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export default function BlogList() {
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "10" });
      if (search) params.set("q", search);
      if (status !== "all") params.set("status", status);
      const response = await adminRequest(`/api/blogs/admin/all?${params.toString()}`);
      setBlogs(response.blogs || []);
      setPagination(response.pagination || { total: 0, totalPages: 1 });
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load articles.");
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => { load(); }, [load]);

  async function remove(blog) {
    if (!window.confirm(`Delete “${blog.title}”? This cannot be undone.`)) return;
    try {
      await adminRequest(`/api/blogs/admin/${blog.id}`, { method: "DELETE" });
      load();
    } catch (err) { setError(err.message); }
  }

  function submitSearch(event) {
    event.preventDefault();
    setPage(1);
    setSearch(query.trim());
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lime-700">Content management</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Blogs</h1>
          <p className="mt-2 text-slate-500">Write, edit and publish travel articles on the Nestroam website.</p>
        </div>
        <Link to="/admin/blogs/new" className="inline-flex items-center gap-2 rounded-xl bg-[#1d2d50] px-5 py-3 font-semibold text-white transition hover:bg-[#293f6b]">
          <Plus size={18} /> Create article
        </Link>
      </div>

      {location.state?.notice && <p role="status" className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">{location.state.notice}</p>}
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={submitSearch} className="flex min-w-0 flex-1 gap-2">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search articles</span>
            <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, slug or description" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-lime-600" />
          </label>
          <button className="rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">Search</button>
        </form>
        <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-lime-600">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>{pagination.total || 0} article{pagination.total === 1 ? "" : "s"}</span>
        <span>Page {page} of {Math.max(1, pagination.totalPages || 1)}</span>
      </div>

      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">Loading articles…</div>
        ) : blogs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <BookOpen size={32} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-lg font-semibold text-slate-800">No articles found</h2>
            <p className="mt-1 text-sm text-slate-500">Create your first travel article or change the filters.</p>
            <Link to="/admin/blogs/new" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1d2d50] px-4 py-2.5 text-sm font-semibold text-white"><Plus size={16} /> Create article</Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {blogs.map((blog) => (
              <article key={blog.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                <img src={imageUrl(blog.featured_image)} alt={blog.featured_image_alt || ""} className="h-24 w-full rounded-xl bg-slate-100 object-cover sm:h-20 sm:w-32" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-slate-900">{blog.title}</h2>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${blog.status === "published" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{blog.status}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{blog.excerpt || "No description added."}</p>
                  <p className="mt-2 text-xs text-slate-400">{blog.category || "Travel Guides"} · Updated {formatDate(blog.updated_at)}{blog.status === "published" ? ` · Published ${formatDate(blog.published_at)}` : ""}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {blog.status === "published" && <a href={`/blogs/${blog.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"><Eye size={15} /> View</a>}
                  <Link to={`/admin/blogs/${blog.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"><FilePenLine size={15} /> Edit</Link>
                  <button onClick={() => remove(blog)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"><Trash2 size={15} /> Delete</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-5 flex justify-end gap-2">
          <button disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40">Previous</button>
          <button disabled={page >= pagination.totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40">Next</button>
        </div>
      )}
    </section>
  );
}
