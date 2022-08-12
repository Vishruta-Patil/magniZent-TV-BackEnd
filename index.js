const express = require("express");
const connectDB = require("./db/db.connect");

const video = require("./routes/video.route")
const category = require("./routes/category.route");

const app = express();

connectDB();
app.use(express.json())

app.get("/", (req, res) => {
  res.send(
    "Shree Krishna Govinda Harae Murari yanatha Narayan Vasudeva Radhae Radhae"
  );
});

app.use("/videos", video)
app.use("/category", category)

app.listen(8000, () => {
  console.log("server has started");
});
