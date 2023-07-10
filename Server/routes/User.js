const express = require("express")
const router = express.Router()
const User = require("./models/User")

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    // Find the user by username
    const user = await User.findOne({ username })

    // Check if the user exists and validate the password
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: "Invalid username or password" })
    }

    // Successful login
    req.session.user = user; // Store user data in session
    res.status(200).json({ message: "Login successful" })
  } catch (error) {
    res.status(500).json({ error: "An error occurred" })
  }
})

// Logout route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "An error occurred" })
    }
    res.status(200).json({ message: "Logout successful" })
  })
})

// Update user route
router.post("/updateUser", async (req, res) => {
  const { email, password } = req.body

  try {
    // Find the user by their ID
    const user = await User.findById(req.session.user._id)

    // Update the user's email and password
    user.email = email
    user.password = password

    // Save the updated user data
    await user.save()

    // Return the updated user data
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the user" })
  }
})

module.exports = router

