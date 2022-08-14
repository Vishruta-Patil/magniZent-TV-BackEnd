const mongoose = require("mongoose")

const watchLaterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos"
    }
})

const WatchLater = mongoose.model("WatchLater", watchLaterSchema)

module.exports = WatchLater