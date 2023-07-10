import React, { useState, useContext } from "react"
import axios from "axios"
import DataContext from "../DataContext"

export default function UserLogin() {
  const { setUser } = useContext(DataContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
  
    // Perform validation on the user input
    if (!username || !password) {
      setError("Please enter both username and password.")
    } else {
      try {
    
        const response = await axios.post("/api/login", { username, password })
  
        // Check the response status and handle success/failure
        if (response.status === 200) {
          // Update the user state with the received user data
          const userData = response.data // Assuming the response data includes the user information
          setUser(userData)
        } else {
          setError("Invalid username or password.")
        }
      } catch (error) {
        // Handle the error case
        setError("An error occurred. Please try again.")
      }
    }
  };
  
  
  const handleSignOut = async () => {
    try {
     
      await axios.post("/api/logout")

      // Clear the user from the context and mark as logged out
      setUser({ username: "" })
      setIsLoggedIn(false)
      setUsername("")
      setPassword("")
      setError("")
    } catch (error) {
      // Handle the error case
      setError("An error occurred during sign out. Please try again.")
    }
  };

  if (isLoggedIn) {
    return (
      <div className="card">
        <h2>Welcome, {username}!</h2>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>User Login Page</h2>
      <form onSubmit={handleLogin}>
        {error && <p>{error}</p>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

