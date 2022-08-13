const express = require("express");
const { signIn, login } = require("../controller/auth.cantroller");
const router = express.Router();

router.route("/login").post(login)
router.route("/signin").post(signIn)

module.exports = router;