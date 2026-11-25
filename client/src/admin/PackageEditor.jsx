import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API, adminRequest } from "./adminApi";

const empty = {
  title: "",
  slug: "",
  short_description: "",
  description: "",
  destination: "",
  duration: "",
  price: "",
  price_label: "",
  cover_image: "",
  status: "draft",
  is_featured: false,
  display_order: 0,
  meta_title: "",
  meta_description: "",
  itinerary: [],
  inclusions: [],
  exclusions: [],
  gallery: [],
};

const lines = (value) =>
  Array.isArray(value) ? value.join("\n") : "";

const itineraryToText = (value) =>
  Array.isArray(value)
    ? value
        .map((day, index) =>
          [day.title || `Day ${index + 1}`, day.description || ""]
            .filter(Boolean)
            .join(" — ")
        )
        .join("\n")
    : "";

export default function PackageEditor() {
  const { id } = useParams();
  const edit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [originalStatus, setOriginalStatus] = useState("draft");
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
        const item = response.packages.find(
          (pkg) => String(pkg.id) === String(id)
        );

        if (!item) throw new Error("Package not found.");

        const status = item.status || "draft";

        setForm({
          ...empty,
          ...item,
          status,
          price: item.price ?? "",
          is_featured: Boolean(item.is_featured),
        });

        setOriginalStatus(status);
        setItineraryText(itineraryToText(item.itinerary));
        setInclusionsText(lines(item.inclusions));
        setExclusionsText(lines(item.exclusions));

        setShowMore(
          Boolean(
            item.description ||
              item.itinerary?.length ||
              item.inclusions?.length ||
              item.exclusions?.length
          )
        );
      })
      .catch((err) => setError(err.message));
  }, [id, edit]);

  function change(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");

    if (!edit && !cover) {
      setError("Please choose a package photo before saving.");
      return;
    }

    const itinerary = itineraryText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [title, ...rest] = line.split(" — ");

        return {
          day: `Day ${index + 1}`,
          title,
          description: rest.join(" — "),
        };
      });

    const payload = {
      ...form,
      slug: "", // The API derives the URL slug from the title.
      itinerary,
      inclusions: inclusionsText
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean),
      exclusions: exclusionsText
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean),
      gallery: [],
      meta_title: form.meta_title || form.title,
      meta_description: form.meta_description || form.short_description,
    };

    if (payload.status === "published") {
      const missing = [
        [payload.destination, "destination"],
        [payload.duration, "duration"],
        [payload.short_description, "short description"],
        [payload.description, "full description"],
        [
          itinerary.some(
            (day) => day.title.trim() && day.description.trim()
          ),
          "at least one complete itinerary day",
        ],
      ]
        .filter(
          ([value]) =>
            !value ||
            (typeof value === "string" && !value.trim())
        )
        .map(([, label]) => label);

      if (missing.length) {
        setShowMore(true);
        setError(
          `Complete these details before publishing: ${missing.join(
            ", "
          )}. You can save the package as a draft meanwhile.`
        );
        return;
      }

      const isBeingPublished =
        !edit || originalStatus !== "published";

      if (isBeingPublished) {
        const confirmed = window.confirm(
          "Publish this package now? It will become visible on the public website."
        );

        if (!confirmed) return;
      }
    }

    setBusy(true);

    const data = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      data.append(
        key,
        typeof value === "object"
          ? JSON.stringify(value)
          : String(value ?? "")
      );
    });

    if (cover) data.append("cover", cover);

    try {
      await adminRequest(
        edit ? `/api/packages/admin/${id}` : "/api/packages/admin",
        {
          method: edit ? "PUT" : "POST",
          body: data,
        }
      );

      const published = payload.status === "published";

      navigate("/admin/packages", {
        replace: true,
        state: {
          notice: edit
            ? published
              ? "Package updated and published."
              : "Package saved as a draft."
            : published
              ? "Package published successfully."
              : "Package saved as a draft.",
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const isPublished = form.status === "published";

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl">
      <Link
        to="/admin/packages"
        className="text-sm font-medium text-slate-500"
      >
        ← Back to packages
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lime-700">
            Package content
          </p>
          <h1 className="mt-1 text-3xl font-bold">
            {edit ? "Update package" : "Add a tour package"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Save as a draft while preparing content. Publish only when the
            page is complete.
          </p>
        </div>

        <button
          disabled={busy}
          className="rounded-xl bg-[#1d2d50] px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Saving…" : isPublished ? "Save & publish" : "Save draft"}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <section className="mt-7 grid gap-5 rounded-2xl border bg-white p-5 sm:p-7">
        <h2 className="text-lg font-bold">Package information</h2>

        <Field
          label="Package name"
          name="title"
          value={form.title}
          onChange={change}
          placeholder="e.g. Rajasthan Heritage Tour"
          required
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Destination / places covered"
            name="destination"
            value={form.destination || ""}
            onChange={change}
            placeholder="e.g. Jaipur, Udaipur, Jodhpur"
          />

          <label className="block text-sm font-semibold text-slate-700">
            Publication status
            <select
              name="status"
              value={form.status}
              onChange={change}
              className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-lime-600"
            >
              <option value="draft">Draft — not visible publicly</option>
              <option value="published">
                Published — visible on website
              </option>
            </select>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Duration"
            name="duration"
            value={form.duration || ""}
            onChange={change}
            placeholder="e.g. 5 Nights / 6 Days"
          />

          <Field
            label="Price per person (₹)"
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={change}
            placeholder="e.g. 12999"
          />
        </div>

        <label className="block text-sm font-semibold text-slate-700">
          Short description
          <textarea
            name="short_description"
            value={form.short_description || ""}
            onChange={change}
            rows={3}
            maxLength={500}
            placeholder="A few lines describing the trip, its highlights and who it is suitable for."
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-lime-600"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Package photo{" "}
          <span className="font-normal text-red-600">(required)</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            required={!edit || !form.cover_image}
            onChange={(event) =>
              setCover(event.target.files?.[0] || null)
            }
            className="mt-2 block w-full rounded-xl border border-slate-300 p-3 font-normal"
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">
            Use one clear JPG, PNG, WEBP or AVIF photo. Maximum 5 MB.
          </span>

          {(cover || form.cover_image) && (
            <img
              src={
                cover
                  ? URL.createObjectURL(cover)
                  : `${API}${form.cover_image}`
              }
              alt="Package preview"
              className="mt-3 h-44 w-full rounded-xl object-cover sm:w-72"
            />
          )}
        </label>
      </section>

      <section className="mt-5 rounded-2xl border bg-white p-5 sm:p-7">
        <button
          type="button"
          onClick={() => setShowMore((value) => !value)}
          className="flex w-full items-center justify-between text-left"
        >
          <span>
            <span className="block font-bold">Page content</span>
            <span className="mt-1 block text-sm font-normal text-slate-500">
              Add details, itinerary and what's included. These are required
              before publishing.
            </span>
          </span>
          <span className="ml-4 text-xl">{showMore ? "−" : "+"}</span>
        </button>

        {showMore && (
          <div className="mt-5 space-y-5">
            <label className="block text-sm font-semibold text-slate-700">
              Full package description
              <textarea
                name="description"
                value={form.description || ""}
                onChange={change}
                rows={4}
                placeholder="Describe the destination, experience and what travellers can expect."
                className="mt-2 w-full rounded-xl border p-3 font-normal"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Day-wise itinerary{" "}
              <span className="font-normal text-slate-500">
                (one day per line; use “ — ” to separate title and details)
              </span>
              <textarea
                value={itineraryText}
                onChange={(event) =>
                  setItineraryText(event.target.value)
                }
                rows={5}
                placeholder={
                  "Day 1: Arrival in Jaipur — Check in and local sightseeing\nDay 2: Explore Jaipur — Visit forts and markets"
                }
                className="mt-2 w-full rounded-xl border p-3 font-normal"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              What's included{" "}
              <span className="font-normal text-slate-500">
                (one item per line)
              </span>
              <textarea
                value={inclusionsText}
                onChange={(event) =>
                  setInclusionsText(event.target.value)
                }
                rows={3}
                placeholder={"Hotel accommodation\nBreakfast"}
                className="mt-2 w-full rounded-xl border p-3 font-normal"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              What's not included{" "}
              <span className="font-normal text-slate-500">
                (one item per line)
              </span>
              <textarea
                value={exclusionsText}
                onChange={(event) =>
                  setExclusionsText(event.target.value)
                }
                rows={3}
                placeholder={"Personal expenses\nActivity charges"}
                className="mt-2 w-full rounded-xl border p-3 font-normal"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="SEO title (optional)"
                name="meta_title"
                value={form.meta_title || ""}
                onChange={change}
                maxLength={180}
                placeholder="Page title shown in search results"
              />

              <label className="block text-sm font-semibold text-slate-700">
                SEO description (optional)
                <textarea
                  name="meta_description"
                  value={form.meta_description || ""}
                  onChange={change}
                  rows={3}
                  maxLength={320}
                  placeholder="Short search-result description"
                  className="mt-2 w-full rounded-xl border p-3 font-normal"
                />
              </label>
            </div>
          </div>
        )}
      </section>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Link
          to="/admin/packages"
          className="rounded-xl border bg-white px-5 py-3"
        >
          Cancel
        </Link>

        <button
          disabled={busy}
          className="rounded-xl bg-[#1d2d50] px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Saving…" : isPublished ? "Save & publish" : "Save draft"}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Drafts stay private in the admin panel. Published packages appear on
        the public package listing and have a detail URL.
      </p>
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input
        {...props}
        className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-lime-600"
      />
    </label>
  );
}