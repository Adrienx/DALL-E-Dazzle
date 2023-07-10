import React, { useContext } from "react"
import Nav from "./Nav"
import DataContext from "../DataContext"

const Header = () => {
  const { user, setUser } = useContext(DataContext)

  const handleSignOut = () => {
    // Clear the user from the context and mark as logged out
    setUser({ username: "" })
  }

  return (
    <div className="header">
      <h1>DALL-E-Dazzle</h1>
      <Nav />
      {user.username && (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  )
}

export default Header
