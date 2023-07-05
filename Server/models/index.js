const mongoose = require('mongoose')
const galleryImageSchema = require('./galleryImage')

const GalleryImage = mongoose.model('galleryImage', galleryImageSchema)

module.exports = {
    GalleryImage
}