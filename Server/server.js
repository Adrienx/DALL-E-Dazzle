const express = require("express")
const cors = require("cors")
// const { GalleryImage } = require('./models')
const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()
const PORT = process.env.PORT || 3001
const db = require('./db')
const app = express()
app.use(cors())

const controller = require('./controllers/galleryImageController')

app.use('/api/gallery', controller.getGalleryImages)

//Set up api route for generating image. This route will be used by the "generateImage" function in the CreatePrompt component.
app.get("/api/generateImage", async (req, res) => {
  const prompt = req.query.prompt

  //create a configuration variable that takes API key from .env
  const configuration = new Configuration({
    apiKey: process.env.VITE_Open_AI_Key,
  })

  // pass the configuration instance to the OpenAIApi
  const openai = new OpenAIApi(configuration)

  //call creatImage api. n = number of images to return.
  const result = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  })

  //If API response exists, then return "imageUrl" (which is what gets passed to setResult in the CreatePrompt ) else return error msg.
  if (result.data.data[0] && result.data.data[0].url) {
    res.json({
      imageUrl: result.data.data[0].url,
    })
  } else {
    res.status(500).json({
      error: "Failed to generate image",
    })
  }
})

app.listen(PORT, () =>
  console.log(`Express server is running on port ${PORT}`)
)
