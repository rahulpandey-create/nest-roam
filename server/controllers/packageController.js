const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const parseJson = (value, fallback = []) => {
  if (Array.isArray(value)) return value;
  if (!value) return fallback;
  try { return typeof value === "string" ? JSON.parse(value) : value; } catch { return fallback; }
};

const serialize = (row) => ({
  ...row,
  itinerary: parseJson(row.itinerary),
  inclusions: parseJson(row.inclusions),
  exclusions: parseJson(row.exclusions),
  gallery: parseJson(row.gallery),
  is_featured: Boolean(row.is_featured),
});
const parseInputArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : []; }
    catch { return value.split(String.fromCharCode(10)).map((x) => x.trim()).filter(Boolean); }
  }
  return [];
};
const clean = (value, max = 5000) => String(value ?? "").trim().slice(0, max);
const makeSlug = (value) => clean(value, 120).toLowerCase()
  .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 120);

function validate(body) {
  const title = clean(body.title, 160);
  const slug = makeSlug(body.slug || title);
  if (!title || !slug) return { error: "Title and a valid slug are required." };
  if (["manali", "shimla", "spiti", "kasol"].includes(slug)) return { error: "This package name is reserved for an existing package page. Choose a different name." };
  const status = body.status === "published" ? "published" : "draft";
  const price = body.price === "" || body.price == null ? null : Number(body.price);
  if (price !== null && (!Number.isFinite(price) || price < 0)) return { error: "Price must be a valid non-negative number." };
  const list = (v) => parseInputArray(v).map(x => clean(x, 1000)).filter(Boolean).slice(0, 60);
  const itinerary = parseInputArray(body.itinerary).slice(0, 40).map((d, i) => ({
    day: clean(d.day || `Day ${i + 1}`, 40),
    title: clean(d.title, 160),
    description: clean(d.description, 3000),
  }));
  return {
    data: {
      title, slug, short_description: clean(body.short_description, 500),
      description: clean(body.description, 10000),
      destination: clean(body.destination, 180), duration: clean(body.duration, 80),
      price, price_label: clean(body.price_label, 80),
      cover_image: clean(body.cover_image, 500),
      itinerary, inclusions: list(body.inclusions), exclusions: list(body.exclusions),
      gallery: list(body.gallery), status,
      is_featured: [true, "true", "1", 1].includes(body.is_featured) ? 1 : 0,
      display_order: Math.max(0, Math.min(9999, Number(body.display_order) || 0)),
      meta_title: clean(body.meta_title, 180),
      meta_description: clean(body.meta_description, 320),
    }
  };
}


function validatePublishedPackage(data) {
  const required = [
    [data.destination, "destination"],
    [data.duration, "duration"],
    [data.short_description, "short description"],
    [data.description, "full description"],
    [data.cover_image, "cover image"],
  ];
  const missing = required.filter(([value]) => !String(value ?? "").trim()).map(([, label]) => label);
  if (!data.itinerary.length || !data.itinerary.some((day) => day.title.trim() && day.description.trim())) {
    missing.push("at least one complete itinerary day");
  }
  return missing.length
    ? `Complete these details before publishing: ${missing.join(", ")}. Save as a draft to continue later.`
    : null;
}

exports.listPublic = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tour_packages WHERE status = 'published' ORDER BY is_featured DESC, display_order ASC, updated_at DESC"
    );
    res.json({ success: true, packages: rows.map(serialize) });
  } catch (error) { next(error); }
};

exports.getPublic = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM tour_packages WHERE slug = ? AND status = 'published' LIMIT 1", [req.params.slug]
    );
    if (!rows[0]) return res.status(404).json({ success: false, message: "Package not found." });
    res.json({ success: true, package: serialize(rows[0]) });
  } catch (error) { next(error); }
};

exports.listAdmin = async (_req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM tour_packages ORDER BY updated_at DESC");
    res.json({ success: true, packages: rows.map(serialize) });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const { data, error } = validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error });
    if (req.file) data.cover_image = `/uploads/packages/${req.file.filename}`;
    if (!data.cover_image) return res.status(400).json({ success: false, message: "A cover image is required." });
    if (data.status === "published") {
      const publishError = validatePublishedPackage(data);
      if (publishError) return res.status(400).json({ success: false, message: publishError });
    }
    const [existing] = await db.execute("SELECT id FROM tour_packages WHERE slug = ? LIMIT 1", [data.slug]);
    if (existing.length) return res.status(409).json({ success: false, message: "That URL slug is already in use." });
    const fields = Object.keys(data);
    const values = fields.map(k => ["itinerary", "inclusions", "exclusions", "gallery"].includes(k) ? JSON.stringify(data[k]) : data[k]);
    const [result] = await db.execute(
      `INSERT INTO tour_packages (${fields.join(",")}) VALUES (${fields.map(() => "?").join(",")})`, values
    );
    res.status(201).json({ success: true, id: result.insertId, message: "Package created." });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const { data, error } = validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error });
    const [existing] = await db.execute("SELECT id, cover_image FROM tour_packages WHERE id = ? LIMIT 1", [req.params.id]);
    if (!existing[0]) return res.status(404).json({ success: false, message: "Package not found." });
    if (req.file) data.cover_image = `/uploads/packages/${req.file.filename}`;
    else if (!data.cover_image) data.cover_image = existing[0].cover_image;
    if (data.status === "published") {
      const publishError = validatePublishedPackage(data);
      if (publishError) return res.status(400).json({ success: false, message: publishError });
    }
    const [duplicate] = await db.execute("SELECT id FROM tour_packages WHERE slug = ? AND id <> ? LIMIT 1", [data.slug, req.params.id]);
    if (duplicate.length) return res.status(409).json({ success: false, message: "That URL slug is already in use." });
    const fields = Object.keys(data);
    const values = fields.map(k => ["itinerary", "inclusions", "exclusions", "gallery"].includes(k) ? JSON.stringify(data[k]) : data[k]);
    await db.execute(
      `UPDATE tour_packages SET ${fields.map(k => `${k} = ?`).join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [...values, req.params.id]
    );
    if (req.file && existing[0].cover_image?.startsWith("/uploads/packages/")) {
      const oldPath = path.join(__dirname, "..", existing[0].cover_image.replace(/^\/+/, ""));
      if (fs.existsSync(oldPath)) fs.unlink(oldPath, () => { });
    }
    res.json({ success: true, message: "Package updated." });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT cover_image FROM tour_packages WHERE id = ? LIMIT 1", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ success: false, message: "Package not found." });
    await db.execute("DELETE FROM tour_packages WHERE id = ?", [req.params.id]);
    const image = rows[0].cover_image;
    if (image?.startsWith("/uploads/packages/")) {
      const filePath = path.join(__dirname, "..", image.replace(/^\/+/, ""));
      if (fs.existsSync(filePath)) fs.unlink(filePath, () => { });
    }
    res.json({ success: true, message: "Package deleted." });
  } catch (error) { next(error); }
};
