const mongoose = require("mongoose")
const {Schema} = mongoose

const videoSchema = new Schema({
    title: String,
    creator: String,
    category: String,
    img_url: String,
    iframe_url: String
})

const Videos = mongoose.model("Videos", videoSchema)

module.exports = Videos