const { Schema } = require('mongoose')
const galleryImageSchema = new Schema(
    {
        imageUrl: { type: String, required: true },
        prompt: { type: String },
        favorite: { type: Boolean }
    },
    { timestamps: true }
)
module.exports = galleryImageSchema