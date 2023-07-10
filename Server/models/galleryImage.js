const mongoose = require("mongoose")

const galleryImageSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        prompt: { type: mongoose.Schema.Types.ObjectId, ref: "Prompt" },
        // favorite: { type: Boolean }
    },
    { timestamps: true }
)
module.exports = mongoose.model('GalleryImage', galleryImageSchema)