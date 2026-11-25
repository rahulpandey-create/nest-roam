import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";
import { API } from "../../admin/adminApi";
import "./blogs.css";

const formatDate = (value) => {
  if (!value) return "Recently published";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Recently published"
    : new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
};

const imageUrl = (path) =>
  !path ? "/og-image.webp" : path.startsWith("http") ? path : `${API}${path}`;

export default function BlogArticle() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    fetch(`${API}/api/blogs/${encodeURIComponent(slug)}`)
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.message || "This article could not be found.");
        }

        return result.blog;
      })
      .then((item) => {
        if (!active) return;

        setBlog(item);

        fetch(
          `${API}/api/blogs?limit=4&category=${encodeURIComponent(
            item.category || ""
          )}`
        )
          .then((response) => response.json().catch(() => ({})))
          .then((relatedResult) => {
            if (active) {
              setRelated(
                (relatedResult.blogs || [])
                  .filter((entry) => entry.slug !== item.slug)
                  .slice(0, 3)
              );
            }
          })
          .catch(() => {
            if (active) setRelated([]);
          });
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-5xl px-5 py-24">
        <div className="h-10 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="mt-5 h-5 w-1/3 animate-pulse rounded bg-slate-100" />
        <div className="mt-10 h-[420px] animate-pulse rounded-3xl bg-slate-100" />
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="mx-auto grid min-h-[65vh] max-w-3xl place-items-center px-5 py-20 text-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#789d2b]">
            Article unavailable
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#1a2a4c]">
            We couldn't find that travel story.
          </h1>
          <p className="mt-3 text-slate-500">
            {error || "The article may have been unpublished or removed."}
          </p>
          <Link
            to="/blogs"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a2a4c] px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} />
            Back to all articles
          </Link>
        </div>
      </main>
    );
  }

  const heroImage = blog.featured_image ? imageUrl(blog.featured_image) : "";

  return (
    <main className="blog-article-page">
      {/* Article hero */}
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-[#1a2a4c] sm:min-h-[650px]">
        {heroImage && (
          <img
            src={heroImage}
            alt={blog.featured_image_alt || ""}
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-44 sm:px-8 sm:pb-16 sm:pt-48">
          <Link
            to="/blogs"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            All travel stories
          </Link>

          <div className="max-w-4xl">
            <p className="inline-flex rounded-full bg-[#8db828] px-4 py-2 text-xs font-bold uppercase tracking-[.15em] text-white">
              {blog.category || "Travel Guides"}
            </p>

            <h1 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
                {blog.excerpt}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/80 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={15} />
                {formatDate(blog.published_at || blog.created_at)}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} />
                {blog.read_time || 1} min read
              </span>

              <span className="inline-flex items-center gap-2">
                <UserRound size={15} />
                {blog.author_name || "Nestroam Holidays"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body and sidebar */}
      <article className="mx-auto max-w-5xl px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto mt-2 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-16">
          <div className="min-w-0">
            <div
              className="blog-article-body"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />

            {Array.isArray(blog.tags) && blog.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                <span className="mr-2 text-sm font-semibold text-slate-500">
                  Topics
                </span>

                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl bg-[#1a2a4c] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#b8d881]">
                Travel with Nestroam
              </p>

              <h2 className="mt-3 text-2xl font-semibold leading-tight">
                Turn your travel plans into memories.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Explore handpicked journeys across Himachal Pradesh.
              </p>

              <Link
                to="/tour-packages"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8db828] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#a0ca3d]"
              >
                View packages
                <ArrowRight size={16} />
              </Link>
            </div>

            {related.length > 0 && (
              <div className="rounded-2xl border border-slate-100 p-5">
                <h2 className="font-bold text-[#1a2a4c]">
                  More travel stories
                </h2>

                <div className="mt-4 space-y-4">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      to={`/blogs/${item.slug}`}
                      className="group block"
                    >
                      <p className="text-xs text-slate-400">{item.category}</p>
                      <h3 className="mt-1 text-sm font-semibold leading-6 text-slate-700 transition group-hover:text-[#729923]">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </article>

      {/* End-of-article links */}
      <section className="bg-[#f4f6ef] px-5 py-14 text-center sm:px-8">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-[#789d2b]">
          Keep exploring
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-[#1a2a4c] sm:text-3xl">
          Find your next destination.
        </h2>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/blogs"
            className="rounded-full border border-[#1a2a4c]/20 px-5 py-3 text-sm font-semibold text-[#1a2a4c]"
          >
            More articles
          </Link>

          <Link
            to="/tour-packages"
            className="rounded-full bg-[#1a2a4c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8db828]"
          >
            Explore tour packages
          </Link>
        </div>
      </section>
    </main>
  );
}