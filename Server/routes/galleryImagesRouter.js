const express = require("express")
const router = express.Router()
const imageController = require("../controllers/galleryImageController")
require("dotenv").config()
const cloudinary = require('cloudinary').v2

// from Cloudinary implementation instructions:
cloudinary.config({
    cloudName: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.VITE_CLOUDINARY_API_KEY,
    apiSecret: process.env.VITE_CLOUDINARY_API_SECRET,
    url: {
      secure: true
    }
})

router.get("/", imageController.index)
router.get("/gallery/:id", imageController.getGalleryImageById)
router.get("/gallery", imageController.getGalleryImages)
router.post("/gallery", imageController.createGalleryImage)
router.delete("/delete/:id", imageController.deleteGalleryImage)

module.exports = router
