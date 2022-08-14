const express = require("express");
const { getAllCategories, getCategory } = require("../controller/category.cantroller");
const router = express.Router();

router.route("/").get(getAllCategories)
router.route("/:categoryId").get(getCategory)

module.exports = router;