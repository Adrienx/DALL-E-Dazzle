const { Schema } = require('mongoose')
const galleryImageSchema = new Schema(
    {
        imageURL: { type: String, required: true },
        prompt: { type: String }
    },
    { timestamps: true }
)
module.exports = galleryImageSchema