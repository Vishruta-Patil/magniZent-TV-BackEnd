const express = require("express");
const { getAllCategories, getCategory } = require("../controller/category.cantroller");
const {authVerify} = require("../middleware/authVerify")
const router = express.Router();

router.route("/").get(authVerify, getAllCategories)
router.route("/:categoryId").get(getCategory)

module.exports = router;