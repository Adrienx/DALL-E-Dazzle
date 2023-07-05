const { GalleryImage } = require("../models/index.js")

// WORKING:
const getGalleryImages = async (req, res) => {
    const images = await GalleryImage.find({})
    res.json(images)
}

// WORKING:
const getGalleryImageById = async (req, res) => {
    try {
      const { id } = req.params
      console.log(id) // check id being pulled
        const image = await GalleryImage.findById(id)
        if (!image) throw Error("Image not found")
        res.json(image)
    } catch (error) {
        console.log(error)
        res.send("Error: Image not found")
    }
}

// NOT WORKING:
const createGalleryImage = async (req, res) => {
    try {
        const newImage = await new GalleryImage(req.body)
        await newImage.save()
        return res.status(201).json({ newImage })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// WORKING:
const deleteGalleryImage = async (req, res) => {
    try {
        const { id } = req.params
        const deletedImage = await GalleryImage.findByIdAndDelete(id)
        if (deletedImage) {
            return res.status(200).send("Image deleted")
        }
        throw new Error("Error: Image not found")
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getGalleryImages,
    getGalleryImageById,
    createGalleryImage,
    deleteGalleryImage,
}
