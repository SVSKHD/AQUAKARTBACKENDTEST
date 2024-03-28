const express = require("express")
const router = express.Router()
const {isLoggedIn , customRole} = require("../middlewares/user")


router.route("/categories").get(isLoggedIn , customRole("admin"))
router.route("/category/:id").put(isLoggedIn , customRole("admin"))
router.route("/category/:id").delete(isLoggedIn , customRole("admin"))
router.route("/category:id").get()
router.route("/category/products").get()





module.exports = router