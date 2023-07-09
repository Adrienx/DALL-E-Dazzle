const express = require("express")
const app = express()
const db = require("./db")
require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT || 3001
const AppRouter = require("./routes/AppRouter.js")
const { Configuration, OpenAIApi } = require("openai")
// const cloudinary = require('cloudinary').v2

///////////////////////////////////////////////////////////////////
//Server Set up

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

db.on("error", console.error.bind(console, "MongoDB connection error:"))

///////////////////////////////////////////////////////////////////

// Cloudinary config setup
// cloudinary.config({
//   cloudName: process.env.VITE_CLOUDINARY_CLOUD_NAME,
//   apiKey: process.env.VITE_CLOUDINARY_API_KEY,
//   apiSecret: process.env.VITE_CLOUDINARY_API_SECRET,
//   url: {
//     secure: true
//   }
// })
// const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

///////////////////////////////////////////////////////////////////

// Middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

///////////////////////////////////////////////////////////////////
// Routes

app.use("/api", AppRouter)

//creating a landing page
app.get("/", (req, res) => {
  res.send("Landing page")
})

//Generate Image Route (So that calls to OpenAI api are made form server and not the client)

//This route will be used by the "generateImage" function in the CreatePrompt component.
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

  //If API responds, return "imageUrl" (which is what gets passed to setResult in the CreateImage ), else return error msg.
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

///////////////////////////////////////////////////////////////////
