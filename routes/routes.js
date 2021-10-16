const { Router } = require("express");
const controllerCategorie = require("../controllers/categorieController");
const controllerTheme = require("../controllers/themeController");
const controllerPlat = require("../controllers/platController");
const {
	requireAuthRestaurant,
	requireAuth
} = require("../middlewares/authMiddlewares");

const router = Router();

router.post("/categorie", requireAuth, controllerCategorie.categorie_post);
router.get("/categorie", requireAuth, controllerCategorie.categorie_get);
router.post("/theme", requireAuthRestaurant, controllerTheme.theme_post);
router.get("/theme", requireAuthRestaurant, controllerTheme.theme_get);
router.post("/add-plat", requireAuthRestaurant, controllerPlat.plat_post);
router.post("/plat", requireAuthRestaurant, controllerPlat.plat_post_id);
router.get("/plat", requireAuthRestaurant, controllerPlat.plat_get);

module.exports = router;
