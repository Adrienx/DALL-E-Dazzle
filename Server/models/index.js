const mongoose = require('mongoose')

const Prompt = require("./Prompt")

const PromptCategory = require("./PromptCategory")

const galleryImageSchema = require('./galleryImage')

const GalleryImage = mongoose.model('galleryImage', galleryImageSchema)

module.exports = { Prompt, PromptCategory, GalleryImage }

