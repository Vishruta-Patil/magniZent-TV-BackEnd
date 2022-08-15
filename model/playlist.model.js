const mongoose = require("mongoose")

const playlistSchema = new mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    video: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos"
    }]
})

const Playlist = mongoose.model("playlist", playlistSchema)

module.exports = Playlist