import React, { useState, useEffect } from "react"
import axios from "axios"
import { CopyToClipboard } from "react-copy-to-clipboard" // Allows copy to clipboard functionality on webpage

const SearchPromptModal = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [prompts, setPrompts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  ////////////////////////////////////////////////////////////////////////////////////////////

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/promptCategories"
      )
      setCategories(response.data)
    } catch (error) {
      console.error("Error:", error)
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  // useEffect to fetch the categories once at component load time for the dropdown list

  useEffect(() => {
    fetchCategories()
  }, [])

  ////////////////////////////////////////////////////////////////////////////////////////////

  const handleSearchPrompts = async () => {
    if (selectedCategoryId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/promptCategories/${selectedCategoryId}`
        )
        setPrompts(response.data.prompts)
        console.log(response.data.prompts)
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        Open Search Prompts Modal
      </button>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              onClick={() => setModalOpen(false)}
              title="Close Modal"
              className="close"
            >
              &times;
            </span>
            {/* /////////////////////////////////////////////////////////////////// */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSearchPrompts()
              }}
            >
              {/* // Select Category from DropdownList/////////////////////////////// */}
              <label>Select a Category:</label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                required
              >
                <option value="">Choose a Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* // Select Prompt to copy to clipboard ///////////////////////////////  */}
              <button type="submit">Search Prompts</button>
            </form>
            <ul id="promptsList">
              {prompts.map((prompt, index) => (
                <li key={index} style={{ cursor: "pointer" }}>
                  <CopyToClipboard
                    text={prompt.description}
                    onCopy={() => alert("Prompt copied to clipboard!")}
                  >
                    <div>
                      <h3>Title: {prompt.title}</h3>
                      <p>Description: {prompt.description}</p>
                    </div>
                  </CopyToClipboard>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchPromptModal
