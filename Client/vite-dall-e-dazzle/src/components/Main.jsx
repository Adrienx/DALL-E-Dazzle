import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import ImageGallery from "./ImageGallery"
import CreateImage from "./CreateImage"
import UserProfile from "./UserProfile"
import UserLogin from "./UserLogin"

const Main = () => {
  return (
    <div className="routes-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateImage" element={<CreateImage />} />
        <Route path="/ImageGallery" element={<ImageGallery />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/UserLogin" element={<UserLogin />} />
      </Routes>
    </div>
  )
}

export default Main