const express = require('express')
const Router = express.Router()
const controller = require('../controllers/galleryImageController')

// from Cloudinary implementation instructions:
// import { Cloudinary } from "@cloudinary/url-gen"
// const App = () => {
//   const cld = new Cloudinary({cloud: {cloudName: 'dall-e-dazzle'}})
// }

Router.get('/gallery/:id', controller.getGalleryImageById)
Router.get('/gallery', controller.getGalleryImages)
Router.delete('/delete/:id', controller.deleteGalleryImage)

module.exports = Router