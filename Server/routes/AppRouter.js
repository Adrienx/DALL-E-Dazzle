const express = require("express")
const router = express.Router()

const promptRoutes = require("./promptRoutes")
const promptCategoriesRoutes = require("./promptCategoriesRoutes")

router.use("/prompts", promptRoutes)
router.use("/promptCategories", promptCategoriesRoutes)

module.exports = router
