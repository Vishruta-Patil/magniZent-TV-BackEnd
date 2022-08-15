const Playlist = require("../model/playlist.model");

// @desc    Get Playlists
// @route   GET api/playlist
// @access  Private
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req._id }).populate("video");
    res.json({
      status: true,
      message: "Successfully fetched playlists",
      playlists,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Upload Playlist
// @route   POST api/playlist
// @access  Private
exports.addPlaylist = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "Provide a playlist name" });
    }

    const playlist = await Playlist.create({ name, user: req._id, video: [] });
    res.status(201).json({
      success: true,
      message: "Playlist added successfully",
      playlist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Delete Playlist
// @route   DELETE api/playlist/:playlistId
// @access  Private
exports.removePlaylist = async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) {
    return res
      .status(400)
      .json({ status: false, message: "Provide a playlistId Id" });
  }
  try {
    const isPlaylist = await Playlist.exists({ _id: playlistId });
    if (!isPlaylist) {
      return res
        .status(400)
        .json({ status: false, message: "Playlist does not exists" });
    }

    const removePlaylist = await Playlist.findOneAndDelete({ _id: playlistId });
    res.json({
      success: true,
      message: "Deleted playlist successfully",
      playlist: removePlaylist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Upload videos to playlist
// @route   POST api/playlist/:playlistId
// @access  Private
exports.addVideoToPlaylist = async (req, res) => {
  const { videoId } = req.body;
  try {
    const playlistVideo = await Playlist.findOneAndUpdate(
      {
        user: req._id,
        _id: req.params.playlistId,
        video: { $ne: videoId },
      },
      { $push: { video: videoId } },
      { new: true, upsert: true }
    ).populate("video");

    if (!playlistVideo) {
      return res
        .status(400)
        .json({ status: false, message: "Video is not preent in playlistId" });
    }

    res.status(201).json({
      success: true,
      message: "Added video to Playlist successfully",
      playlistVideo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Upload Playlist
// @route   GET api/playlist/:playlistId
// @access  Private
exports.getVideosFromPlaylist = async (req, res) => {
  try {
    const videosFromPlaylist = await Playlist.find({
      _id: req.params.playlistId,
    }).populate("video");

    res.status(200).json({
      success: true,
      message: "Fetched videos from Playlist successfully",
      video: videosFromPlaylist[0]?.video ?? [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Remove videos from playlist
// @route   POST api/playlist/:playlistId/:videoId
// @access  Private
exports.removeVideoFromPlaylist = async (req, res) => {
  const { playlistId, videoId } = req.params;
  try {
    const playlistVideo = await Playlist.findOneAndUpdate(
      {
        user: req._id,
        _id: playlistId,
      },
      { $pull: { video: videoId } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Deleted video from Playlist successfully",
      playlistVideo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
