const express = require('express')
const Router = express.Router()
const controller = require('../controllers/galleryImageController')

// from Cloudinary implementation instructions:
// import { Cloudinary } from "@cloudinary/url-gen"
// const App = () => {
//   const cld = new Cloudinary({cloud: {cloudName: 'dall-e-dazzle'}})
// }

Router.get('/api/gallery', controller.getGalleryImages)
Router.get('/api/gallery/:id', controller.getGalleryImageById)

module.exports = Router