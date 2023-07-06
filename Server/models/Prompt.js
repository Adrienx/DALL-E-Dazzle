const mongoose = require("mongoose")

const PromptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "PromptCategory" },
})

module.exports = mongoose.model("Prompt", PromptSchema)
