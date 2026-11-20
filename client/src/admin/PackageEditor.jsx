import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API, adminRequest } from "./adminApi";

const empty = {
  title: "", slug: "", short_description: "", description: "", destination: "",
  duration: "", price: "", price_label: "", cover_image: "",
  status: "published", is_featured: false, display_order: 0,
  meta_title: "", meta_description: "", itinerary: [], inclusions: [], exclusions: [], gallery: [],
};
const lines = (value) => Array.isArray(value) ? value.join("\n") : "";
const itineraryToText = (value) => Array.isArray(value)
  ? value.map((day, i) => [day.title || `Day ${i + 1}`, day.description || ""].filter(Boolean).join(" — ")).join("\n")
  : "";

export default function PackageEditor() {
  const { id } = useParams();
  const edit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [cover, setCover] = useState(null);
  const [itineraryText, setItineraryText] = useState("");
  const [inclusionsText, setInclusionsText] = useState("");
  const [exclusionsText, setExclusionsText] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!edit) return;
    adminRequest("/api/packages/admin/all")
      .then((response) => {
        const item = response.packages.find((pkg) => String(pkg.id) === String(id));
        if (!item) throw new Error("Package not found.");
        setForm({ ...empty, ...item, status: "published", price: item.price ?? "", is_featured: Boolean(item.is_featured) });
        setItineraryText(itineraryToText(item.itinerary));
        setInclusionsText(lines(item.inclusions));
        setExclusionsText(lines(item.exclusions));
        setShowMore(Boolean(item.description || item.itinerary?.length || item.inclusions?.length || item.exclusions?.length));
      })
      .catch((err) => setError(err.message));
  }, [id, edit]);

  function change(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!edit && !cover) {
      setError("Please choose a package photo before publishing.");
      return;
    }
    setBusy(true);
    const itinerary = itineraryText.split("\n").map((line, index) => line.trim()).filter(Boolean).map((line, index) => {
      const [title, ...rest] = line.split(" — ");
      return { day: `Day ${index + 1}`, title, description: rest.join(" — ") };
    });
    const payload = {
      ...form,
      slug: "", // The server generates a URL-friendly slug from the title.
      status: "published", // New and edited packages go live immediately.
      itinerary,
      inclusions: inclusionsText.split("\n").map((x) => x.trim()).filter(Boolean),
      exclusions: exclusionsText.split("\n").map((x) => x.trim()).filter(Boolean),
      gallery: [],
      meta_title: form.meta_title || form.title,
      meta_description: form.meta_description || form.short_description,
    };
    const data = new FormData();
    Object.entries(payload).forEach(([key, value]) => data.append(key, typeof value === "object" ? JSON.stringify(value) : String(value ?? "")));
    if (cover) data.append("cover", cover);
    try {
      await adminRequest(edit ? `/api/packages/admin/${id}` : "/api/packages/admin", {
        method: edit ? "PUT" : "POST",
        body: data,
      });
      navigate("/admin/packages", { replace: true, state: { notice: edit ? "Package updated and live on the website." : "Package published successfully. It is now live on the website." } });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl">
      <Link to="/admin/packages" className="text-sm font-medium text-slate-500">← Back to packages</Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lime-700">Simple package publishing</p>
          <h1 className="mt-1 text-3xl font-bold">{edit ? "Update package" : "Add a tour package"}</h1>
          <p className="mt-2 text-sm text-slate-500">Fill in the basics and publish. Your package will appear on the website automatically.</p>
        </div>
        <button disabled={busy} className="rounded-xl bg-[#1d2d50] px-5 py-3 font-semibold text-white disabled:opacity-60">
          {busy ? "Publishing…" : edit ? "Save and publish" : "Publish package"}
        </button>
      </div>

      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <section className="mt-7 grid gap-5 rounded-2xl border bg-white p-5 sm:p-7">
        <h2 className="text-lg font-bold">Package information</h2>
        <Field label="Package name" name="title" value={form.title} onChange={change} placeholder="e.g. Manali Family Getaway" required />
        <Field label="Places covered" name="destination" value={form.destination || ""} onChange={change} placeholder="e.g. Manali, Solang Valley" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Duration" name="duration" value={form.duration || ""} onChange={change} placeholder="e.g. 5 Nights / 6 Days" />
          <Field label="Price per person (₹)" name="price" type="number" min="0" value={form.price} onChange={change} placeholder="e.g. 12999" />
        </div>
        <label className="block text-sm font-semibold text-slate-700">
          Short description
          <textarea name="short_description" value={form.short_description || ""} onChange={change} rows={3} maxLength={500} placeholder="A few lines describing the trip, its highlights and who it is suitable for." className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-lime-600" />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Package photo <span className="font-normal text-red-600">(required)</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" required={!edit || !form.cover_image} onChange={(event) => setCover(event.target.files?.[0] || null)} className="mt-2 block w-full rounded-xl border border-slate-300 p-3 font-normal" />
          <span className="mt-1 block text-xs font-normal text-slate-500">Use one clear JPG, PNG or WEBP photo. Maximum 5 MB.</span>
          {(cover || form.cover_image) && <img src={cover ? URL.createObjectURL(cover) : `${API}${form.cover_image}`} alt="Package preview" className="mt-3 h-44 w-full rounded-xl object-cover sm:w-72" />}
        </label>
      </section>

      <section className="mt-5 rounded-2xl border bg-white p-5 sm:p-7">
        <button type="button" onClick={() => setShowMore((value) => !value)} className="flex w-full items-center justify-between text-left">
          <span><span className="block font-bold">More details (optional)</span><span className="mt-1 block text-sm font-normal text-slate-500">Add a full description, itinerary and what's included. You can publish without these.</span></span>
          <span className="ml-4 text-xl">{showMore ? "−" : "+"}</span>
        </button>
        {showMore && <div className="mt-5 space-y-5">
          <label className="block text-sm font-semibold text-slate-700">Full package description<textarea name="description" value={form.description || ""} onChange={change} rows={4} placeholder="Add more information about the tour…" className="mt-2 w-full rounded-xl border p-3 font-normal" /></label>
          <label className="block text-sm font-semibold text-slate-700">Day-wise itinerary <span className="font-normal text-slate-500">(one day per line; optional)</span><textarea value={itineraryText} onChange={(event) => setItineraryText(event.target.value)} rows={5} placeholder={"Day 1: Arrival in Manali — Check in and local sightseeing\nDay 2: Solang Valley — Enjoy the valley and activities"} className="mt-2 w-full rounded-xl border p-3 font-normal" /></label>
          <label className="block text-sm font-semibold text-slate-700">What's included <span className="font-normal text-slate-500">(one item per line)</span><textarea value={inclusionsText} onChange={(event) => setInclusionsText(event.target.value)} rows={3} placeholder="Hotel accommodation\nBreakfast" className="mt-2 w-full rounded-xl border p-3 font-normal" /></label>
          <label className="block text-sm font-semibold text-slate-700">What's not included <span className="font-normal text-slate-500">(one item per line)</span><textarea value={exclusionsText} onChange={(event) => setExclusionsText(event.target.value)} rows={3} placeholder="Personal expenses\nAdventure activity charges" className="mt-2 w-full rounded-xl border p-3 font-normal" /></label>
        </div>}
      </section>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Link to="/admin/packages" className="rounded-xl border bg-white px-5 py-3">Cancel</Link>
        <button disabled={busy} className="rounded-xl bg-[#1d2d50] px-6 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Publishing…" : edit ? "Save and publish" : "Publish package"}</button>
      </div>
      <p className="mt-4 text-center text-xs text-slate-500">Your package is published immediately after you select “Publish package”.</p>
    </form>
  );
}

function Field({ label, ...props }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<input {...props} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-lime-600" /></label>;
}
