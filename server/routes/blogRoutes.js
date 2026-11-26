const router = require("express").Router();
const controller = require("../controllers/blogController");
const auth = require("../middleware/adminAuth");
const upload = require("../middleware/blogUpload");

// Admin routes must be declared before the public /:slug route.
router.post("/admin/upload-image", auth, upload.single("image"), controller.uploadImage);
router.post("/admin/preview", auth, controller.preview);
router.get("/admin/all", auth, controller.listAdmin);
router.get("/admin/:id", auth, controller.getAdmin);
router.post("/admin", auth, controller.create);
router.put("/admin/:id", auth, controller.update);
router.delete("/admin/:id", auth, controller.remove);

router.get("/sitemap.xml", controller.sitemap);
router.get("/", controller.listPublic);
router.get("/:slug", controller.getPublic);

module.exports = router;
