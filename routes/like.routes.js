const express = require("express");
const { authVerify } = require("../middleware/authVerify");
const router = express.Router();
const {
    addToLikedVideos,
  getWatchLaterVideos,
  deleteWatchLaterVideo,
} = require("../controller/like.cantroller");

router
  .route("/")
  .get(authVerify, getWatchLaterVideos)
  .post(authVerify, addToLikedVideos);

router.route("/:videoId").delete(authVerify, deleteWatchLaterVideo);

module.exports = router;
