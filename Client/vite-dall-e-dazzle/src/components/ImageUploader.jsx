import React, { useContext } from "react"
import { CloudinaryContext } from "cloudinary-react"
import DataContext from "../DataContext"

const ImageUploader = () => {
  const { result } = useContext(DataContext)
  const handleUpload = () => {
    const image = result
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "new-dall-e-dazzle-upload")

    fetch(`https://api.cloudinary.com/v1_1/dall-e-dazzle/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image uploaded to Cloudinary", data)
      })
      .catch((error) => {
        console.error("Error uploading image", error)
      })
  }

  return (
    <div className="result-container">
      <button className="btn" onClick={handleUpload}>
        Save to Gallery
      </button>
      <CloudinaryContext cloudName="dall-e-dazzle" />
    </div>
  )
}

export default ImageUploader
