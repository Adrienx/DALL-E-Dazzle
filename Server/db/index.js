const mongoose = require("mongoose")

mongoose
  .connect("mongodb://127.0.0.1:27017/dalledazzledb")
  .then(() => {
    console.log("Successfully connected to MongoDB.")
  })
  .catch((e) => {
    console.error("Connection error", e.message)
  })
mongoose.set("debug", true)

const db = mongoose.connection

module.exports = db
