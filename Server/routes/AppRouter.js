const express = require("express")
const router = express.Router()

const promptRoutes = require("./promptRoutes")
const promptCategoriesRoutes = require("./promptCategoriesRoutes")
const galleryImagesRouter = require("./galleryImagesRouter")

router.use("/prompts", promptRoutes)
router.use("/promptCategories", promptCategoriesRoutes)
router.use("/gallery", galleryImagesRouter)

module.exports = router
