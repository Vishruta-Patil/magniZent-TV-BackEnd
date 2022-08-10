const express = require('express')
const app = express()

app.get("/", (req,res) => {
    res.send("Shree Krishna Govinda Harae Murari yanatha narayan vasudeva Radhae Radhae")
})

app.listen(8000, () => {
    console.log("server has started")
})