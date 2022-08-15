const express = require("express");
const { authVerify } = require("../middleware/authVerify");
const router = express.Router();
const {
  addPlaylist,
  getPlaylists,
  removePlaylist,
  addVideoToPlaylist,
  getVideosFromPlaylist,
  removeVideoFromPlaylist,
} = require("../controller/playlist.cantroller");

router.route("/").get(authVerify, getPlaylists).post(authVerify, addPlaylist);

router
  .route("/:playlistId")
  .get(authVerify, getVideosFromPlaylist)
  .post(authVerify, addVideoToPlaylist)
  .delete(authVerify, removePlaylist);

router.route("/:playlistId/:videoId").delete(authVerify, removeVideoFromPlaylist);

module.exports = router;
