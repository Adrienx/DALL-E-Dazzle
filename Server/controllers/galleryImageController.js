const { GalleryImage } = require('../models')

const getGalleryImages = async (req, res) => {
    const images = await GalleryImage.find({})
    res.json(images)
  }

const getGalleryImageById = async (req, res) => {
    const image = await GalleryImage.findOne()
    res.json(image)
  }

// const createGalleryImage = 

// const deleteGalleryImage = 

module.exports = {
    getGalleryImages,
    getGalleryImageById,
}