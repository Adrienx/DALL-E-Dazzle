import DataContext from "../DataContext"
import { useContext, useState } from "react"
import axios from "axios"
import { inspirationPrompts } from "../data/inspirationPrompts"
import CreatePrompt from "./CreatePrompt"
import SearchPrompt from "./SearchPrompt"
import UpdatePrompt from "./UpdatePrompt"
import DeletePrompt from "./DeletePrompt"
import DeleteCategory from "./DeleteCategory"

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
  // Show "Loading..." text while fetching image

  if (loading) {
    return <div>Loading...</div>
  }

  ////////////////////////////////////////////////////////////////////////////////////////////
  // Handles the display of textarea, buttons for modals and the generated image itself.

  return (
    <div className="main-card">
      <div className="generate-image">
        <h2 className="card-heading">Enter prompt to generate an image</h2>
        <textarea
          className="text-input"
          placeholder="An Anime Styled Sword-Weilding Corgi wearing Military Gear in a Forest.."
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt} // inserts inspireMe prompt into textarea, the is the "prompt" state defined over in the App.jsx file.
          rows="5"
          cols="50"
        />
        <div className="button-container">
          <button className="btn btn-generate" onClick={generateImage}>
            Generate an Image
          </button>
          <button className="btn btn-inspire" onClick={inspireMe}>
            Inspire Me!
          </button>
        </div>
        {/* Ternary operator-if 'result' state contains an image URL, display an img element with the source set to the URL and a 'Regenerate Image' button is shown. If no 'result', display nothing. */}
        {result ? (
          <div className="result-container">
            <img className="result-img" src={result} alt="result" />
            <button className="btn btn-regenerate" onClick={generateImage}>
              Regenerate Image
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="manage-prompts">
        <CreatePrompt />
        <SearchPrompt />
        <UpdatePrompt />
        <DeletePrompt />
        <DeleteCategory />
      </div>
    </div>
  )
}
