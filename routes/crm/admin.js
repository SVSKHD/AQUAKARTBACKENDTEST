const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  getAllEcomUsers,
} = require("../../controllers/crm/adminController");
const {
  isLoggedIn,
  customAdminRole,
  customRole,
} = require("../../middlewares/user");

router.get("/admin/status", (req, res) => {
  res.json({ message: "aquakart admin status v1 active" });
});
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get(
  "/get-all-ecom-users",
  getAllEcomUsers,
);

module.exports = router;
