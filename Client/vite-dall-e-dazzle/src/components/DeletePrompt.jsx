import React, { useState, useEffect } from "react"
import axios from "axios"

////////////////////////////////////////////////////////////////////////////////////////////

const DeletePromptModal = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [prompts, setPrompts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  ////////////////////////////////////////////////////////////////////////////////////////////

  // Fetch the categories at component load time
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

  // Fetch the prompts of a selected category
  const handleSearchPrompts = async () => {
    if (selectedCategoryId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/promptCategories/${selectedCategoryId}`
        )
        if (Array.isArray(response.data.prompts)) {
          setPrompts(response.data.prompts)
        } else {
          console.log(
            "Error: Expected array but received",
            response.data.prompts
          )
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  //  Handle Prompt deletion
  const handlePromptDelete = async (promptId) => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        await axios.delete(`http://localhost:3001/api/prompts/${promptId}`)
        setPrompts(prompts.filter((prompt) => prompt._id !== promptId))
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <button
        className="btn"
        onClick={() => setModalOpen(true)}
        disabled={!categories.length} // Button disabled if categories.length is "false" or "0", ie no categories left.
        title={categories.length ? "" : "No prompts available"} // If categories array length is "0"/empty, then disaplay msg.
      >
        Delete Prompt
      </button>
      {modalOpen && (
        <div className="modal-container">
          <div className="modal-content-container">
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
              <label>Select a Category: </label>
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
              <button title="Search for Prompt to Delete" type="submit">
                {" "}
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
              </button>
            </form>
            {/* /////////////////////////////////////////////////////////////////// */}
            <h5>(Click on prompt to delete)</h5>
            <ul id="promptsList">
              {prompts.map((prompt, index) => (
                <li
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePromptDelete(prompt._id)}
                >
                  <div>
                    <h3>Title: {prompt.title}</h3>
                    <p>Description: {prompt.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default DeletePromptModal
