import React, { useContext, useState } from "react"
import axios from "axios"
import DataContext from "../DataContext"

export default function UserProfile() {
  const { user, setUser } = useContext(DataContext)
  const [email, setEmail] = useState(user.email || "")
  const [password, setPassword] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post("/api/updateUser", {
        email,
        password,
      })

      // Update the user state with the updated user data
      const updatedUser = response.data;
      setUser(updatedUser)
    } catch (error) {
      // Handle the error case
      console.error("An error occurred while updating the user:", error)
    }
  }

  return (
    <div className="card">
      <h2>User Profile Page</h2>
      <p>Username: {user.username}</p>
      <div>
        <label>New Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  )
}
