const express = require("express");
const connectDB = require("./db/db.connect");

const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send(
    "Shree Krishna Govinda Harae Murari yanatha Narayan Vasudeva Radhae Radhae"
  );
});

app.listen(8000, () => {
  console.log("server has started");
});
