const WatchLater = require("../model/watchLater.model");

// @desc    Upload watchlater video
// @route   POST /api/watchlater
// @access  Private
exports.addToWatchLater = async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res
      .status(400)
      .json({ status: false, message: "Provide a video id" });
  }
  try {
    const isWatchLater = await WatchLater.exists({
      video: videoId,
      user: req._id,
    });

    if (isWatchLater) {
      return res.status(400).json({
        status: false,
        message: "Video is already present in watch later",
      });
    }

    let watchLaterVideo = await WatchLater.create({
      video: videoId,
      user: req._id,
    });
    watchLaterVideo = await watchLaterVideo.populate("video");

    res.status(201).json({
      success: true,
      message: "Video added to watchlater successfully",
      watchLater: watchLaterVideo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get watchlater videos
// @route   GET /api/watchlater
// @access  Private
exports.getWatchLaterVideos = async (req, res) => {
  try {
    const watchLaterVideos = await WatchLater.find({ user: req._id }).populate(
      "video"
    );

    if (!watchLaterVideos || watchLaterVideos.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No videos present in the watchlater",
      });
    }

    res.json({
      success: true,
      message: "Successfully fetched watchlater videos",
      watchLater: watchLaterVideos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete watchlater video
// @route   DELETE /api/watchlater/:videoId
// @access  Private
exports.deleteWatchLaterVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const deleteWatchLater = await WatchLater.findOneAndDelete({
      user: req._id,
      video: videoId,
    });

    if (!deleteWatchLater) {
      return res.status(404).json({
        status: false,
        message: "video is not present in the watchlater",
      });
    }

    res.json({
      success: true,
      message: "Deleted watchlater video successfully",
      watchLater: deleteWatchLater,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
