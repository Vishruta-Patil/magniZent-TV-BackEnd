const express = require("express");
const router = express.Router();
const {
  getHistoryVideos,
  addToHistory,
  removeFromHistory,
  removeAllHistory
} = require("../controller/history.cantroller");
const { authVerify } = require("../middleware/authVerify");

router
  .route("/")
  .get(authVerify, getHistoryVideos)
  .post(authVerify, addToHistory)
  .delete(authVerify, removeAllHistory)

  router.route("/:videoId").delete(authVerify, removeFromHistory)

module.exports = router;
