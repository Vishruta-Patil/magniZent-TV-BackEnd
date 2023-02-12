const Like = require("../model/like.model");

// @desc    Upload liked video
// @route   POST /api/likes
// @access  Private
exports.addToLikedVideos = async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res
      .status(400)
      .json({ status: false, message: "Provide a video id" });
  }
  try {
    const isLiked = await Like.exists({
      video: videoId,
      user: req._id,
    });

    if (isLiked) {
      return res.status(400).json({
        status: false,
        message: "Video is already present in liked videos",
      });
    }

    let likedVideo = await Like.create({
      video: videoId,
      user: req._id,
    });
    likedVideo = await likedVideo.populate("video");

    res.status(201).json({
      success: true,
      message: "Video added to like videos successfully",
      like: likedVideo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get liked videos
// @route   GET /api/likes
// @access  Private
exports.getWatchLaterVideos = async (req, res) => {
  try {
    const likedVideos = await Like.find({ user: req._id }).populate(
      "video"
    );

    if (!likedVideos || likedVideos.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No videos present in the like videos",
      });
    }

    res.json({
      success: true,
      message: "Successfully fetched watchlater videos",
      like: likedVideos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Delete liked video
// @route   DELETE /api/likes/:videoId
// @access  Private
exports.deleteWatchLaterVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const deleteLikedVideo = await Like.findOneAndDelete({
      user: req._id,
      video: videoId,
    });

    if (!deleteLikedVideo) {
      return res.status(404).json({
        status: false,
        message: "video is not present in the liked",
      });
    }

    res.json({
      success: true,
      message: "Deleted liked video successfully",
      like: deleteLikedVideo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
