const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')
const connectDB = require("./db/db.connect");
const pageNotFound = require("./middleware/pageNotFound")

const video = require("./routes/video.route");
const category = require("./routes/category.route");
const auth = require("./routes/auth.routes");
const watchLater = require("./routes/watchLater.routes");
const history = require("./routes/history.routes")
const like = require("./routes/like.routes")
const playlist = require("./routes/playlist.routes")

const app = express();
dotenv.config();
connectDB();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Backend for MagniZent TV - Video Library"
  );
});

// routes middleware
app.use("/videos", video);
app.use("/category", category);
app.use("/", auth);
app.use("/watchlater", watchLater);
app.use("/history", history);
app.use("/likes", like)
app.use("/playlist", playlist)

app.use(pageNotFound)

app.listen(process.env.PORT | 8000, () => {
  console.log("server has started");
});
