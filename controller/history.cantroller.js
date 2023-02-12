const History = require("../model/history.model");

// @desc    Get history videos
// @route   GET /api/history
// @access  Private
exports.getHistoryVideos = async (req, res) => {

  try {
    const historyVideos = await History.find({ user: req._id }).populate(
      "video"
    );

    res.status(201).json({
      status: true,
      message: "Successfully fetched history videos",
      history: historyVideos,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// @desc    Upload History Video
// @route   POST /api/history
// @access  Private
exports.addToHistory = async (req, res) => {
  const { videoId } = req.body;
  if (!videoId) {
    return res
      .status(400)
      .json({ status: false, message: "Provide a video Id" });
  }
  try {
    const isHistory = await History.exists({ video: videoId, user: req._id });
    if (isHistory) {
      return res
        .status(400)
        .json({ status: false, message: "Video already exists in history" });
    }

    let historyVideo = await History.create({ video: videoId, user: req._id });
    historyVideo = await historyVideo.populate("video");

    res.json({
      status: true,
      message: "Successfully added video in history",
      history: historyVideo,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// @desc    Delete History Video
// @route   DELETE /api/history/:videoId
// @access  Private
exports.removeFromHistory = async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    return res
      .status(400)
      .json({ status: false, message: "Provide a video Id" });
  }
  try {
    const isHistory = await History.exists({ video: videoId, user: req._id });
    if (!isHistory) {
      return res
        .status(400)
        .json({ status: false, message: "Video does not exists in history" });
    }

    const deleteHistoryVideo = await History.findOneAndDelete({
      video: videoId,
      user: req._id,
    });

    res.json({
      status: true,
      message: "Successfully deleted video in history",
      history: deleteHistoryVideo,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// @desc    Delete all videos from history
// @route   DELETE api/history
// @access  Private
exports.removeAllHistory = async (req, res) => {
  try {
    const isHistory = await History.exists({ user: req._id });
    if (!isHistory) {
      return res
        .status(400)
        .json({ status: false, message: "There are no videos in the history" });
    }

    const deleteHistory = await History.deleteMany({ user: req._id });
    res.json({
      status: true,
      message: "Successfully deleted all videos from history",
      history: deleteHistory,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
