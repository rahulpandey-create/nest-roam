const db = require("../config/db");
const sanitizeHtml = require("sanitize-html");

const clean = (value, max = 1000) => String(value ?? "").trim().slice(0, max);
const slugify = (value) => clean(value, 180)
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 180);

const parseTags = (value) => {
  let values = value;
  if (typeof values === "string") {
    try { values = JSON.parse(values); }
    catch { values = values.split(","); }
  }
  if (!Array.isArray(values)) return [];
  return [...new Set(values.map((tag) => clean(tag, 40)).filter(Boolean))].slice(0, 20);
};

const safeContent = (value) => sanitizeHtml(String(value ?? ""), {
  allowedTags: [
    "p", "br", "strong", "b", "em", "i", "u", "s", "h2", "h3", "h4",
    "ul", "ol", "li", "blockquote", "hr", "a", "img", "figure",
    "table", "thead", "tbody", "tr", "th", "td", "div", "span",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height"],
    th: ["colspan", "rowspan", "style"],
    td: ["colspan", "rowspan", "style"],
    p: ["style"],
    h2: ["style"],
    h3: ["style"],
    h4: ["style"],
  },
  allowedStyles: {
    "*": { "text-align": [/^(left|center|right|justify)$/] },
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
  },
});

const parseTagsFromRow = (row) => ({
  ...row,
  tags: parseTags(row.tags),
  read_time: calculateReadTime(row.content),
});

const serializeListRow = (row) => {
  const { content, ...article } = row;
  return { ...parseTagsFromRow(article), read_time: calculateReadTime(content) };
};

function calculateReadTime(html) {
  const text = String(html || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ");
  const words = text.trim().match(/\S+/g)?.length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

function validate(body) {
  const title = clean(body.title, 180);
  const slug = slugify(body.slug || title);
  const excerpt = clean(body.excerpt, 600);
  const content = safeContent(body.content);
  const featuredImage = clean(body.featured_image, 500);
  const featuredImageAlt = clean(body.featured_image_alt, 255);
  const category = clean(body.category || "Travel Guides", 100);
  const status = body.status === "published" ? "published" : "draft";
  const tags = parseTags(body.tags);
  const metaTitle = clean(body.meta_title || title, 180);
  const metaDescription = clean(body.meta_description || excerpt, 320);
  const focusKeyword = clean(body.focus_keyword, 180);

  if (!title) return { error: "Article title is required." };
  if (!slug) return { error: "Enter a valid URL slug using letters, numbers and hyphens." };
  if (slug.length > 180) return { error: "URL slug must be 180 characters or fewer." };
  if (status === "published") {
    const missing = [];
    if (!excerpt) missing.push("short description");
    if (!content || !content.replace(/<[^>]*>/g, " ").trim()) missing.push("article content");
    if (!featuredImage) missing.push("featured image");
    if (missing.length) return { error: `Complete these details before publishing: ${missing.join(", ")}. Save as a draft to continue later.` };
  }

  return {
    data: {
      title, slug, excerpt, content,
      featured_image: featuredImage || null,
      featured_image_alt: featuredImageAlt || null,
      category: category || "Travel Guides",
      tags: JSON.stringify(tags),
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      focus_keyword: focusKeyword || null,
      status,
    },
  };
}

const parsePagination = (query) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(30, Math.max(1, Number.parseInt(query.limit, 10) || 12));
  return { page, limit, offset: (page - 1) * limit };
};

exports.preview = (req, res) => {
  return res.json({ success: true, content: safeContent(req.body?.content) });
};

exports.uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "Choose an image to upload." });
  return res.status(201).json({
    success: true,
    path: `/uploads/blogs/${req.file.filename}`,
    originalName: req.file.originalname,
  });
};

exports.listPublic = async (req, res, next) => {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const search = clean(req.query.q, 120);
    const category = clean(req.query.category, 100);
    const clauses = ["status = 'published'"];
    const params = [];
    if (search) {
      clauses.push("(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)");
      const term = `%${search}%`;
      params.push(term, term, term);
    }
    if (category) { clauses.push("category = ?"); params.push(category); }
    const where = clauses.join(" AND ");
    const [[countRow]] = await db.execute(`SELECT COUNT(*) AS total FROM blogs WHERE ${where}`, params);
    const [rows] = await db.execute(
      `SELECT id, title, slug, excerpt, featured_image, featured_image_alt, category, tags, author_name, published_at, created_at, updated_at, meta_title, meta_description, content FROM blogs WHERE ${where} ORDER BY COALESCE(published_at, created_at) DESC, id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    const [categoryRows] = await db.execute(
      "SELECT DISTINCT category FROM blogs WHERE status = 'published' AND category <> '' ORDER BY category ASC"
    );
    const total = Number(countRow.total || 0);
    return res.json({
      success: true,
      blogs: rows.map(serializeListRow),
      categories: categoryRows.map((row) => row.category),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) { next(error); }
};

exports.getPublic = async (req, res, next) => {
  try {
    const slug = slugify(req.params.slug);
    const [rows] = await db.execute(
      "SELECT id, title, slug, excerpt, content, featured_image, featured_image_alt, category, tags, author_name, published_at, created_at, updated_at, meta_title, meta_description, focus_keyword FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1",
      [slug]
    );
    if (!rows[0]) return res.status(404).json({ success: false, message: "Article not found." });
    return res.json({ success: true, blog: parseTagsFromRow(rows[0]) });
  } catch (error) { next(error); }
};

exports.listAdmin = async (req, res, next) => {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const search = clean(req.query.q, 120);
    const status = ["draft", "published"].includes(req.query.status) ? req.query.status : "";
    const clauses = [];
    const params = [];
    if (search) {
      clauses.push("(title LIKE ? OR slug LIKE ? OR excerpt LIKE ?)");
      const term = `%${search}%`;
      params.push(term, term, term);
    }
    if (status) { clauses.push("status = ?"); params.push(status); }
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const [[countRow]] = await db.execute(`SELECT COUNT(*) AS total FROM blogs ${where}`, params);
    const [rows] = await db.execute(
      `SELECT id, title, slug, excerpt, featured_image, featured_image_alt, category, tags, author_name, status, published_at, created_at, updated_at FROM blogs ${where} ORDER BY updated_at DESC, id DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    const total = Number(countRow.total || 0);
    return res.json({
      success: true,
      blogs: rows.map(parseTagsFromRow),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) { next(error); }
};

exports.getAdmin = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM blogs WHERE id = ? LIMIT 1", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ success: false, message: "Article not found." });
    return res.json({ success: true, blog: parseTagsFromRow(rows[0]) });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const { data, error } = validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error });
    const [existing] = await db.execute("SELECT id FROM blogs WHERE slug = ? LIMIT 1", [data.slug]);
    if (existing.length) return res.status(409).json({ success: false, message: "That URL slug is already in use. Choose another one." });
    const publishedAt = data.status === "published" ? new Date() : null;
    const [result] = await db.execute(
      `INSERT INTO blogs (title, slug, excerpt, content, featured_image, featured_image_alt, category, tags, meta_title, meta_description, focus_keyword, status, author_id, author_name, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.title, data.slug, data.excerpt, data.content, data.featured_image, data.featured_image_alt, data.category, data.tags, data.meta_title, data.meta_description, data.focus_keyword, data.status, req.admin?.id || null, clean(req.admin?.name || "Nestroam Holidays", 120), publishedAt]
    );
    return res.status(201).json({ success: true, id: result.insertId, message: data.status === "published" ? "Article published." : "Draft saved." });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ success: false, message: "That URL slug is already in use." });
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { data, error } = validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error });
    const [existingRows] = await db.execute("SELECT id, published_at FROM blogs WHERE id = ? LIMIT 1", [req.params.id]);
    if (!existingRows[0]) return res.status(404).json({ success: false, message: "Article not found." });
    const [duplicateRows] = await db.execute("SELECT id FROM blogs WHERE slug = ? AND id <> ? LIMIT 1", [data.slug, req.params.id]);
    if (duplicateRows.length) return res.status(409).json({ success: false, message: "That URL slug is already in use. Choose another one." });

    const publishedAt = data.status === "published"
      ? (existingRows[0].published_at || new Date())
      : null;
    await db.execute(
      `UPDATE blogs SET title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, featured_image_alt = ?, category = ?, tags = ?, meta_title = ?, meta_description = ?, focus_keyword = ?, status = ?, published_at = ? WHERE id = ?`,
      [data.title, data.slug, data.excerpt, data.content, data.featured_image, data.featured_image_alt, data.category, data.tags, data.meta_title, data.meta_description, data.focus_keyword, data.status, publishedAt, req.params.id]
    );
    return res.json({ success: true, message: data.status === "published" ? "Article updated and published." : "Draft saved." });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ success: false, message: "That URL slug is already in use." });
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const [result] = await db.execute("DELETE FROM blogs WHERE id = ?", [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ success: false, message: "Article not found." });
    return res.json({ success: true, message: "Article deleted." });
  } catch (error) { next(error); }
};

exports.sitemap = async (_req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT slug, updated_at, published_at FROM blogs WHERE status = 'published' ORDER BY published_at DESC"
    );
    const escapeXml = (value) => String(value ?? "").replace(/[<>&'\"]/g, (character) => ({
      "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
    }[character]));
    const urls = rows.map((row) => {
      const lastmod = new Date(row.updated_at || row.published_at).toISOString();
      return `<url><loc>https://nestroamholidays.com/blogs/${escapeXml(row.slug)}</loc><lastmod>${lastmod}</lastmod></url>`;
    }).join("");
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  } catch (error) { next(error); }
};
