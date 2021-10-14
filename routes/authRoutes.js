const { Router } = require("express");
const authController = require("../controllers/authController");
const authRestaurantController = require("../controllers/authRestaurantController");

const router = Router();

router.post("/signup-restaurant", authRestaurantController.signup_post);
router.post("/signup", authController.signup_post);
router.post("/login-restaurant", authRestaurantController.login_post);
router.post("/login", authController.login_post);
router.get("/logout-restaurant", authRestaurantController.logout_get);
router.get("/logout", authController.logout_get);

module.exports = router;
