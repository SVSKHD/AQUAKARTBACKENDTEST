const express = require("express")
const router = express.Router()
const {isLoggedIn , customRole} = require("../../middlewares/user")


router.route("/invoices").get(isLoggedIn , customRole("admin"))
router.route("/invoice/:id").get(isLoggedIn , customRole("admin"))
router.route("/invoice/customer/:id").get()
router.route("/invoice/:id").put(isLoggedIn , customRole("admin"))
router.route("/invoice/:id").delete(isLoggedIn , customRole("admin"))
router.route("/invoices/gst").get(isLoggedIn , customRole("admin"))
router.route("/invoice/po").get(isLoggedIn , customRole("admin"))
router.route("/invoice/gst/:id").get(isLoggedIn , customRole("admin"))
router.route("/invoice/po/:id").get(isLoggedIn , customRole("admin"))
router.route("/invoice/month").get(isLoggedIn , customRole("admin"))
router.route("/invoice/dates").get(isLoggedIn , customRole("admin"))




module.exports = router