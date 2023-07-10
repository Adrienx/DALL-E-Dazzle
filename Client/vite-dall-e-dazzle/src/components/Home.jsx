import React, { useContext } from "react"
import UserContext from "../DataContext"

const Home = () => {
  const { user } = useContext(UserContext)

  return (
  
      <div className="landing-page-img">
        <img
          src="https://petapixel.com/assets/uploads/2023/03/image5-1536x809.jpg"
          alt="logo"
        />
  
    </div>
  )
}

export default Home
