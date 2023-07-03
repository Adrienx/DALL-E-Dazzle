const mongoose = require('mongoose')
const galleryImageSchema = require('./galleryImage')

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema)

module.exports = {
    GalleryImage
}