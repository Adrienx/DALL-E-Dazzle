const express = require("express")
const router = express.Router()
const imageController = require("../controllers/galleryImageController")
require("dotenv").config()
// const cloudinary = require('cloudinary').v2;

// from Cloudinary implementation instructions:
// cloudinary.config({
//     cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.VITE_CLOUDINARY_API_KEY,
//     api_secret: process.env.VITE_CLOUDINARY_API_SECRET
// })

router.get("/", imageController.index)
router.get("/gallery/:id", imageController.getGalleryImageById)
router.get("/gallery", imageController.getGalleryImages)
router.post("/gallery", imageController.createGalleryImage)
router.delete("/delete/:id", imageController.deleteGalleryImage)

module.exports = router
