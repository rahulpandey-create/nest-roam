import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BookOpen, FileText, Image as ImageIcon, Search, SlidersHorizontal, Eye, Upload, Check, ChevronLeft, ChevronRight, Save, Send } from "lucide-react";
import { API, adminRequest } from "./adminApi";
import RichTextEditor from "./RichTextEditor";
import "./blogEditor.css";

const emptyBlog = {
  title: "", slug: "", excerpt: "", content: "", featured_image: "",
  featured_image_alt: "", category: "Travel Guides", tags: [],
  meta_title: "", meta_description: "", focus_keyword: "", status: "draft",
};

const steps = [
  { label: "Basic Information", hint: "Title, summary and category", icon: FileText },
  { label: "Featured Image", hint: "Choose the article cover", icon: ImageIcon },
  { label: "Rich Content Editor", hint: "Write and format the article", icon: BookOpen },
  { label: "SEO Settings & SERP", hint: "Search and social metadata", icon: Search },
  { label: "Publishing Workflow", hint: "Review and publish", icon: SlidersHorizontal },
];

const slugify = (value) => String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 180);
const imageUrl = (path) => !path ? "" : path.startsWith("http") ? path : `${API}${path}`;

function Field({ label, name, value, onChange, placeholder, required = false, maxLength, help, rows = 0 }) {
  const shared = { name, value: value ?? "", onChange, maxLength, placeholder, required, className: "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal text-slate-800 outline-none transition focus:border-lime-600 focus:ring-2 focus:ring-lime-100" };
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}{required && <span className="ml-1 text-red-500">*</span>}
      {rows ? <textarea {...shared} rows={rows} /> : <input {...shared} />}
      {help && <span className="mt-1.5 block text-xs font-normal text-slate-400">{help}</span>}
    </label>
  );
}

export default function BlogEditor() {
  const { id } = useParams();
  const edit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyBlog);
  const [step, setStep] = useState(0);
  const [slugEdited, setSlugEdited] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [featuredFile, setFeaturedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(edit);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  useEffect(() => {
    if (!edit) return;
    let active = true;
    adminRequest(`/api/blogs/admin/${id}`)
      .then((response) => {
        if (!active) return;
        const item = response.blog;
        setForm({ ...emptyBlog, ...item, tags: Array.isArray(item.tags) ? item.tags : [] });
        setTagInput((item.tags || []).join(", "));
        setSlugEdited(true);
      })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [edit, id]);

  const previewImage = useMemo(() => imageUrl(form.featured_image), [form.featured_image]);
  const wordCount = useMemo(() => (form.content || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim().match(/\S+/g)?.length || 0, [form.content]);
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function updateTitle(value) {
    setForm((current) => ({ ...current, title: value, ...(!slugEdited ? { slug: slugify(value) } : {}) }));
  }

  function updateTags(value) {
    setTagInput(value);
    update("tags", [...new Set(value.split(",").map((tag) => tag.trim()).filter(Boolean))].slice(0, 20));
  }

  async function uploadFeaturedImage(file) {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    setError("");
    try {
      const result = await adminRequest("/api/blogs/admin/upload-image", { method: "POST", body: formData });
      update("featured_image", result.path);
      setFeaturedFile(file);
      setNotice("Featured image uploaded.");
    } catch (err) { setError(err.message); }
    finally { setUploading(false); }
  }

  async function save(nextStatus = form.status) {
    setError("");
    setNotice("");
    if (!form.title.trim()) {
      setStep(0);
      setError("Add an article title before saving.");
      return;
    }
    if (nextStatus === "published") {
      const missing = [];
      if (!form.excerpt.trim()) missing.push("short description");
      if (!form.content.replace(/<[^>]*>/g, " ").trim()) missing.push("article content");
      if (!form.featured_image) missing.push("featured image");
      if (missing.length) {
        setStep(missing.includes("featured image") ? 1 : missing.includes("article content") ? 2 : 0);
        setError(`Complete these details before publishing: ${missing.join(", ")}.`);
        return;
      }
      if (!window.confirm(`${edit ? "Update and publish" : "Publish"} this article? It will be visible on the public website.`)) return;
    }

    setSaving(true);
    const payload = { ...form, status: nextStatus, slug: slugify(form.slug || form.title) };
    try {
      const response = await adminRequest(edit ? `/api/blogs/admin/${id}` : "/api/blogs/admin", {
        method: edit ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      navigate("/admin/blogs", {
        replace: true,
        state: { notice: response.message || (nextStatus === "published" ? "Article published." : "Draft saved.") },
      });
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  async function preview() {
    setError("");
    try {
      const result = await adminRequest("/api/blogs/admin/preview", {
        method: "POST",
        body: JSON.stringify({ content: form.content }),
      });
      setPreviewContent(result.content || "");
      setPreviewOpen(true);
    } catch (err) { setError(err.message); }
  }

  function stepContent() {
    if (step === 0) return (
      <div className="grid gap-5">
        <div><h2 className="text-xl font-bold text-slate-900">Article information</h2><p className="mt-1 text-sm text-slate-500">Start with the details readers will see before opening the article.</p></div>
        <Field label="Article title" name="title" value={form.title} onChange={(event) => updateTitle(event.target.value)} placeholder="e.g. 10 Best Places to Visit in Himachal Pradesh" required maxLength={180} help={`${form.title.length}/180 characters`} />
        <Field label="URL slug" name="slug" value={form.slug} onChange={(event) => { setSlugEdited(true); update("slug", slugify(event.target.value)); }} placeholder="best-places-to-visit-in-himachal" help={`Public URL: nestroamholidays.com/blogs/${form.slug || "your-article-slug"}`} />
        <Field label="Short description / excerpt" name="excerpt" value={form.excerpt} onChange={(event) => update("excerpt", event.target.value)} placeholder="A short introduction to the article. This appears on blog cards and search previews." rows={4} maxLength={600} required help={`${form.excerpt.length}/600 characters`} />
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">Category<select value={form.category} onChange={(event) => update("category", event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal outline-none focus:border-lime-600"><option>Travel Guides</option><option>Destinations</option><option>Travel Tips</option><option>Adventure</option><option>Experiences</option><option>Culture & Food</option><option>News & Updates</option></select></label>
          <Field label="Tags" name="tags" value={tagInput} onChange={(event) => updateTags(event.target.value)} placeholder="Himachal, Manali, Travel tips" help="Separate tags with commas. Up to 20 tags." />
        </div>
      </div>
    );
    if (step === 1) return (
      <div className="grid gap-5">
        <div><h2 className="text-xl font-bold text-slate-900">Featured image</h2><p className="mt-1 text-sm text-slate-500">This image appears on the blog listing, article header and social previews.</p></div>
        <label className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-lime-600 hover:bg-lime-50/30">
          {previewImage ? <img src={previewImage} alt={form.featured_image_alt || "Featured preview"} className="max-h-72 w-full rounded-xl object-cover" /> : <><span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-500 shadow-sm"><Upload size={25} /></span><span className="mt-4 font-semibold text-slate-800">Click to upload a featured image</span><span className="mt-1 text-sm text-slate-500">JPG, PNG, WEBP or AVIF · Maximum 5 MB</span></>}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => uploadFeaturedImage(event.target.files?.[0])} />
        </label>
        {uploading && <p className="text-sm text-blue-700">Uploading image…</p>}
        {previewImage && <button type="button" onClick={() => { update("featured_image", ""); setFeaturedFile(null); }} className="justify-self-start text-sm font-semibold text-red-600 hover:text-red-700">Remove featured image</button>}
        <Field label="Image alt text" name="featured_image_alt" value={form.featured_image_alt} onChange={(event) => update("featured_image_alt", event.target.value)} placeholder="Describe what is visible in the image" help="Useful for accessibility and image search. Describe the image, not the keyword." />
        {featuredFile && <p className="text-xs text-slate-400">Selected file: {featuredFile.name}</p>}
      </div>
    );
    if (step === 2) return (
      <div className="grid gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-xl font-bold text-slate-900">Article content</h2><p className="mt-1 text-sm text-slate-500">Use headings and images to make long travel articles easy to scan.</p></div><div className="text-right text-xs text-slate-500"><p>{wordCount.toLocaleString()} words</p><p>{readTime} min read</p></div></div>
        <RichTextEditor value={form.content} onChange={(value) => update("content", value)} />
        <p className="text-xs text-slate-400">Use Heading 2 for main sections and Heading 3 for subsections. Article title is automatically displayed as the page H1.</p>
      </div>
    );
    if (step === 3) return (
      <div className="grid gap-5">
        <div><h2 className="text-xl font-bold text-slate-900">SEO settings & search preview</h2><p className="mt-1 text-sm text-slate-500">These fields help search engines and social networks understand the article.</p></div>
        <Field label="SEO meta title" name="meta_title" value={form.meta_title} onChange={(event) => update("meta_title", event.target.value)} placeholder={form.title || "Article title for search engines"} maxLength={180} help={`${(form.meta_title || form.title).length}/180 characters. Leave blank to use the article title.`} />
        <Field label="SEO meta description" name="meta_description" value={form.meta_description} onChange={(event) => update("meta_description", event.target.value)} placeholder={form.excerpt || "Write a concise search description"} maxLength={320} rows={3} help={`${(form.meta_description || form.excerpt).length}/320 characters. Leave blank to use the excerpt.`} />
        <Field label="Focus keyword" name="focus_keyword" value={form.focus_keyword} onChange={(event) => update("focus_keyword", event.target.value)} placeholder="e.g. places to visit in Himachal" help="Editorial reference only; this is not a Google ranking field." />
        <div className="rounded-2xl border border-slate-200 bg-[#fbfaf7] p-5">
          <div className="mb-3 flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Google search preview</p><span className="text-xs text-slate-400">Illustrative preview</span></div>
          <p className="text-xs text-[#47723a]">nestroamholidays.com › blogs › {form.slug || "article-slug"}</p>
          <h3 className="mt-1 line-clamp-2 text-xl font-medium text-[#1a0dab]">{form.meta_title || form.title || "Your article title"}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{form.meta_description || form.excerpt || "Your article description will appear here."}</p>
        </div>
      </div>
    );
    return (
      <div className="grid gap-5">
        <div><h2 className="text-xl font-bold text-slate-900">Publishing workflow</h2><p className="mt-1 text-sm text-slate-500">Save unfinished writing as a draft. Publishing makes the article publicly accessible.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => update("status", "draft")} className={`rounded-2xl border p-5 text-left transition ${form.status === "draft" ? "border-amber-400 bg-amber-50" : "border-slate-200 bg-white hover:border-slate-300"}`}><span className="text-sm font-bold text-slate-900">Save as draft</span><span className="mt-1 block text-sm text-slate-500">Only administrators can see this article.</span></button>
          <button type="button" onClick={() => update("status", "published")} className={`rounded-2xl border p-5 text-left transition ${form.status === "published" ? "border-green-500 bg-green-50" : "border-slate-200 bg-white hover:border-slate-300"}`}><span className="text-sm font-bold text-slate-900">Publish article</span><span className="mt-1 block text-sm text-slate-500">Visible to website visitors and search engines when indexing is enabled.</span></button>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-800">Pre-publish checklist</h3>
          <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            {[ ["Article title", Boolean(form.title.trim())], ["Short description", Boolean(form.excerpt.trim())], ["Featured image", Boolean(form.featured_image)], ["Article content", Boolean(form.content.replace(/<[^>]*>/g, " ").trim())], ["SEO title", Boolean(form.meta_title || form.title)], ["SEO description", Boolean(form.meta_description || form.excerpt)] ].map(([label, complete]) => <li key={label} className="flex items-center gap-2"><span className={`grid h-5 w-5 place-items-center rounded-full ${complete ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-400"}`}>{complete ? <Check size={13} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}</span>{label}</li>)}
          </ul>
        </div>
        <p className="text-xs text-slate-400">Author will be recorded from the currently signed-in administrator. Published dates are assigned by the server.</p>
      </div>
    );
  }

  if (loading) return <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">Loading article…</div>;

  return (
    <section className="mx-auto max-w-6xl">
      <Link to="/admin/blogs" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"><ChevronLeft size={16} /> Back to blogs</Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-wider text-lime-700">Blog publishing</p><h1 className="mt-1 text-3xl font-bold text-slate-900">{edit ? "Edit article" : "Create travel article"}</h1><p className="mt-2 text-sm text-slate-500">Work through each step, then save a draft or publish.</p></div>
        <div className="flex flex-wrap gap-2"><button type="button" onClick={preview} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Eye size={16} /> Preview</button><button type="button" disabled={saving} onClick={() => save("draft")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-50"><Save size={16} /> Save draft</button><button type="button" disabled={saving} onClick={() => save("published")} className="inline-flex items-center gap-2 rounded-xl bg-[#1d2d50] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#293f6b] disabled:opacity-50"><Send size={16} /> {saving ? "Saving…" : edit && form.status === "published" ? "Update & publish" : "Publish"}</button></div>
      </div>

      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">{notice}</p>}

      <nav aria-label="Article creation steps" className="mt-7 overflow-x-auto rounded-2xl border border-[#e8dfd1] bg-[#fbfaf7] p-2">
        <div className="flex min-w-[800px] gap-1">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return <button key={item.label} type="button" onClick={() => setStep(index)} className={`flex min-w-0 flex-1 items-center gap-2 rounded-xl px-3 py-3 text-left transition ${step === index ? "bg-white text-[#9c7b42] shadow-sm ring-1 ring-[#d8c39c]" : "text-slate-500 hover:bg-white/70"}`}><Icon size={18} className="shrink-0" /><span className="min-w-0"><span className={`block truncate text-xs font-bold sm:text-sm`}>{index + 1}. {item.label}</span><span className="mt-0.5 hidden truncate text-[11px] text-slate-400 xl:block">{item.hint}</span></span></button>;
          })}
        </div>
      </nav>

      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">{stepContent()}</section>
      <div className="mt-5 flex items-center justify-between gap-3"><button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 disabled:opacity-40"><ChevronLeft size={16} /> Previous</button><span className="text-xs text-slate-400">Step {step + 1} of {steps.length}</span><button type="button" disabled={step === steps.length - 1} onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))} className="inline-flex items-center gap-2 rounded-xl bg-[#1d2d50] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40">Next <ChevronRight size={16} /></button></div>

      {previewOpen && <div className="fixed inset-0 z-[2000] overflow-y-auto bg-slate-950/70 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Article preview"><div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-wider text-lime-700">Preview</p><h2 className="mt-1 font-bold text-slate-900">{form.title || "Untitled article"}</h2></div><button type="button" onClick={() => setPreviewOpen(false)} className="rounded-lg border px-3 py-2 text-sm font-semibold">Close</button></div><article className="px-5 py-8 sm:px-12"><p className="text-xs font-bold uppercase tracking-wider text-lime-700">{form.category}</p><h1 className="mt-3 text-3xl font-bold leading-tight text-[#1a2a4c] sm:text-5xl">{form.title || "Untitled article"}</h1><p className="mt-4 text-lg leading-8 text-slate-500">{form.excerpt}</p>{previewImage && <img src={previewImage} alt={form.featured_image_alt} className="mt-8 max-h-[460px] w-full rounded-2xl object-cover" />}<div className="blog-preview-content mt-8" dangerouslySetInnerHTML={{ __html: previewContent }} /></article></div></div>}
    </section>
  );
}
