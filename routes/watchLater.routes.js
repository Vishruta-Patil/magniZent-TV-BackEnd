const express = require("express");
const { authVerify } = require("../middleware/authVerify");
const router = express.Router();
const {
  addToWatchLater,
  getWatchLaterVideos,
  deleteWatchLaterVideo,
} = require("../controller/watchLater.cantroller");

router
  .route("/")
  .get(authVerify, getWatchLaterVideos)
  .post(authVerify, addToWatchLater);

router.route("/:videoId").delete(authVerify, deleteWatchLaterVideo);

module.exports = router;
