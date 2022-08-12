const Videos = require("../model/video.model");
const mongoose = require("mongoose");

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Videos.find({});

    if(!videos || videos.length === 0) {
        return res.status(400).json({success: false, message:"No videos found"})  
    }

    res.json({success: true, videos });
  } catch (error) {
    res.status(500).json({success: false, message:error.message})
  }
};


// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
exports.getVideoById = async(req,res) => {
    try {
        const {videoId} = req.params
        var validId = mongoose.Types.ObjectId.isValid(videoId);
        if(validId) {
        const video = await Videos.findById(videoId)
        return res.json({success: true, video });
        }   
        res.status(400).json({success: false, message:"Cannot find product"})    
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
        console.log(error)
      }
}


// @desc    Upload video
// @route   PUT /api/video
// @access  Public
exports.addVideo = async (req, res) => {
  try {
    const { title, creator, category, img_url, iframe_url } = req.body;

    if(!title || !creator) {
        return res.status(400).json({success: false, message: "Please provide all the fields"})
    }

    const Video = new Videos({ title, creator, category, img_url, iframe_url });
    const saveVideo = await Video.save();

    res.status(201).json({success: true, message: `Video added successfully, ${saveVideo}`});
  } catch (error) {
    res.status(500).json({success: false, message:error.message})
  }
};
