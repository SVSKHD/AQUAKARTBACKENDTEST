const express = require("express");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/subcategories").get(isLoggedIn, customRole("admin"));
router.route("/subcategory/:id").put(isLoggedIn, customRole("admin"));
router.route("/subcategory/:id").delete(isLoggedIn, customRole("admin"));
router.route("/subcategory:id").get();
router.route("/subcategory/products").get();

module.exports = router;
