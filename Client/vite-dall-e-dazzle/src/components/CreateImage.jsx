import DataContext from "../DataContext"
import { useContext, useState } from "react"
import axios from "axios"

export default function CreatePrompt() {
  const { prompt, setPrompt, result, setResult } = useContext(DataContext)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    try {
      setLoading(true) // set loading state to true when starting to fetch image
      const res = await axios.get(
        `http://localhost:3001/api/generateImage?prompt=${prompt}`
      )
      console.log(res.data.imageUrl)
      setResult(res.data.imageUrl)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false) // set loading state to false after image is fetched
    }
  }

  // Show "Loading..." text while fetching image
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="card">
      <h2>Enter prompt to generate an image</h2>

      <textarea
        className="app-input"
        placeholder="Search An Anime Styled Sword-Weilding Corgi wearing Military Gear in a Forest.."
        onChange={(e) => setPrompt(e.target.value)}
        rows="5"
        cols="50"
      />
      <div className="button">
        <button onClick={generateImage}>Generate an Image</button>
      </div>
      {/* If the 'result' state contains an image URL, an image element is displayed with the source set to the URL and a 'Regenerate Image' button is shown. If there's no 'result', nothing extra is displayed. */}
      {result ? (
        <>
          <img className="result-image" src={result} alt="result" />
          <div className="button">
            {/* The 'Regenerate Image' button also calls the 'generateImage' function when clicked, allowing the user to generate a new image with the same prompt. */}
            <button onClick={generateImage}>Regenerate Image</button>
          </div>
        </>
      ) : (
        <></> // Empty fragment, displays nothing if 'result' is null or empty.
      )}
    </div>
  )
}
