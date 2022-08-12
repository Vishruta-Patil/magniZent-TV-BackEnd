const express = require("express");
const { getAllVideos, getVideoById, addVideo } = require("../controller/video.cantroller");
const router = express.Router();

router.route("/").get(getAllVideos).post(addVideo);
router.route("/:videoId").get(getVideoById)

module.exports = router;