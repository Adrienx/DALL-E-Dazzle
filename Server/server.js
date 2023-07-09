const express = require("express")
const cors = require("cors")
const { Configuration, OpenAIApi } = require("openai")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const User = require("./models/User.js")
const routes = require("./routes/User.js") 

app.use("/api", routes)


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

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
)
