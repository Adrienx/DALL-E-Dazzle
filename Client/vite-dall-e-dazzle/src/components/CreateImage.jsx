import DataContext from "../DataContext"
import { useContext, useState } from "react"
import axios from "axios"
// import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from "@cloudinary/url-gen"
// import { URLConfig } from "@cloudinary/url-gen";
// import { CloudConfig } from "@cloudinary/url-gen"
import { inspirationPrompts } from "../data/inspirationPrompts"
import CreatePrompt from "./CreatePrompt"
import SearchPrompt from "./SearchPrompt"
import UpdatePrompt from "./UpdatePrompt"
import DeletePrompt from "./DeletePrompt"

import DeleteCategory from "./DeleteCategory"
// import { GalleryImage } from "../../../../Server/models"

////////////////////////////////////////////////////////////////////////////////////////////
export default function CreateImage() {
  const { prompt, setPrompt, result, setResult } = useContext(DataContext)
  const [loading, setLoading] = useState(false)

  ////////////////////////////////////////////////////////////////////////////////////////////
  // Function that randomly selects a prompt from the imported inspirationPrompts array.

  const inspireMe = () => {
    const randomPrompt =
      inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)]
    setPrompt(randomPrompt)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  // Function that handles the generation of AI Image

  const generateImage = async () => {
    try {
      setLoading(true) // set loading state to true when starting to fetch image
      const res = await axios.get(
        `http://localhost:3001/api/generateImage?prompt=${prompt}`
      )
      // console.log(res.data.imageUrl)
      setResult(res.data.imageUrl)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false) // set loading state to false after image is fetched
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  // Function to send 'result' image url (from Adrien's code) to Cloudinary for upload

  const imageToCloudinary = async () => {
    Cloudinary.v2.uploader
      .unsigned_upload(`${result}`, `${cloudName}`)
      .then(result => console.log(result))
  }

  // Function to return the corresponding Cloudinary URL for the hosted image
  // Store the image and its cld URL in the mongo DB as a new object
  // Display new image on gallery page

  // const saveImage = async () => {
  //   try {
  //     const { image, setImage } = useContext(DataContext)
  //     let myImage = new CloudinaryImage('dall-e-dazzle')
  //     // const imageUrl = await cloudinary.uploader.upload(image)
  //     const newImage = await GalleryImage.create({
  //       image: myImage
  //     })
  //     setImage(newImage)
  //     return res.status(201).json({ newImage })
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message })
  //   }
  // }

  ////////////////////////////////////////////////////////////////////////////////////////////
  // Show "Loading..." text while fetching image

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  // Handles the display of textarea, buttons for modals and the generated image itself.

  return (
    <div className="main-card">
      <div className="generate-image">
        <h2 className="card-heading">Enter Prompt to Generate Image: </h2>
        <textarea
          className="text-input"
          placeholder="An Anime Styled Sword-Weilding Corgi wearing Military Gear in a Forest.."
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt} // inserts inspireMe prompt into textarea, the is the "prompt" state defined over in the App.jsx file.
          rows="5"
          cols="50"
        />
        <div className="button-container">
          <div>
            <button className="btn btn-generate" onClick={generateImage}>
              Generate an Image
            </button>
          </div>
          <div>
            <button className="btn btn-inspire" onClick={inspireMe}>
              Inspire Me!
            </button>
          </div>
        </div>
      </div>
        {/* Ternary operator-if 'result' state contains an image URL, display an img element with the source set to the URL and a 'Regenerate Image' button is shown. If no 'result', display nothing. */}
        {result ? (
          <div className="result-container">
            <img className="result-img" src={result} alt="result" /> <br />
            <button className="btn btn-regenerate" onClick={generateImage}>
              Regenerate Image
            </button>
         <button onClick={imageToCloudinary}>Save to Gallery</button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="manage-prompts">
        <CreatePrompt /> <br />
        <SearchPrompt /> <br />
        <UpdatePrompt /> <br />
        <DeletePrompt /> <br />
        <DeleteCategory />
      </div>
    </div>
  )
}
