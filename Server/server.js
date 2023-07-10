const express = require("express")
const app = express()
const db = require("./db")
require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT || 3001
const AppRouter = require("./routes/AppRouter.js")
const { Configuration, OpenAIApi } = require("openai")
// const cloudinary = const mongoose = require("mongoose")
require('cloudinary').v2

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
// 
const uploadEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

///////////////////////////////////////////////////////////////////

// Middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.json())

const User = require("./models/User.js")
const routes = require("./routes/User.js") 

app.use("/api", routes)


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

  
  const configuration = new Configuration({
    apiKey: process.env.VITE_Open_AI_Key,
  })

  
  const openai = new OpenAIApi(configuration);

  
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

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body

  try {
    // Find the user by username and password
    const user = await User.findOne({ username, password })

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    res.json({ message: "Login successful" })
  } catch (error) {
    res.status(500).json({ error: "An error occurred" })
  }
})

app.post("/api/logout", (req, res) => {
  // Perform any necessary logout logic

  res.json({ message: "Logout successful" })
})

///////////////////////////////////////////////////////////////////
