const router = require("express").Router();
const controller = require("../controllers/packageController");
const auth = require("../middleware/adminAuth");
const upload = require("../middleware/packageUpload");

router.get("/", controller.listPublic);
router.get("/:slug", controller.getPublic);
router.get("/admin/all", auth, controller.listAdmin);
router.post("/admin", auth, upload.single("cover"), controller.create);
router.put("/admin/:id", auth, upload.single("cover"), controller.update);
router.delete("/admin/:id", auth, controller.remove);

module.exports = router;
