const express = require("express")
const router = express.Router()
const imageController = require("../controllers/galleryImageController")

// from Cloudinary implementation instructions:
// import { Cloudinary } from "@cloudinary/url-gen"
// const App = () => {
//   const cld = new Cloudinary({cloud: {cloudName: 'dall-e-dazzle'}})
// }

router.get("/", imageController.index)
router.get("/gallery/:id", imageController.getGalleryImageById)
router.get("/gallery", imageController.getGalleryImages)
router.post("/gallery", imageController.createGalleryImage)
router.delete("/delete/:id", imageController.deleteGalleryImage)

module.exports = router
