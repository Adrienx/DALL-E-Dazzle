import React, { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form" //https://react-hook-form.com/docs/useform

const UpdatePromptModal = () => {
  const { register, handleSubmit, setValue } = useForm() //  useForm hook allows the use of "register" (used to register input fields with the form), "handleSubmit" (provides form validation for onSubmit) and "setValue" to dynamically set the value of a registered field
  const [categories, setCategories] = useState([])
  const [prompts, setPrompts] = useState([])
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  ////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // Fetch categories and set them into state when component mounts
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
    fetchCategories()
  }, [])

  ////////////////////////////////////////////////////////////////////////////////////////////

  const handleCategoryChange = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/prompts/category/${categoryId}`
      )
      setPrompts(response.data)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt)
    setValue("newTitle", prompt.title)
    setValue("newDescription", prompt.description)
  }

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:3001/api/prompts/${selectedPrompt._id}`,
        {
          title: data.newTitle,
          description: data.newDescription,
          category: data.updateCategory,
        }
      )
      alert("Changes saved successfully.")
      setModalOpen(false)
    } catch (error) {
      console.error("Error:", error)
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
        Update Prompt
      </button>

      {modalOpen && (
        <div className="modal-container">
          <div className="modal-content-container">
            <div className="close-modal">
              <span
                onClick={() => setModalOpen(false)}
                title="Close Modal"
                className="close"
              >
                &times;
              </span>
            </div>
            {/* /////////////////////////////////////////////////////////////////// */}
            <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-inputs">
                <label htmlFor="updateCategorySelect">Select Category: </label>
                <select
                  id="updateCategorySelect"
                  name="updateCategory"
                  {...register("updateCategory")}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">Choose a Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="newTitle">Title:</label>
                <input
                  type="text"
                  {...register("newTitle")}
                  id="newTitle"
                  name="newTitle"
                />
                <label htmlFor="newDescription">Description: </label>
                <textarea
                  {...register("newDescription")}
                  id="newDescription"
                  name="newDescription"
                  rows="5"
                  cols="50"
                />
              </div>
              {/* /////////////////////////////////////////////////////////////////// */}
              <div className="click-msg">
                <h3>(Click on prompt to edit)</h3>
              </div>
              <ul className="ul-promptlist" id="updatePromptsList">
                {prompts.map((prompt) => (
                  <li
                    key={prompt._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt.description}
                  </li>
                ))}
              </ul>

              {/* /////////////////////////////////////////////////////////////////// */}
              <div className="modal-buttons">
                <button type="submit">
                  <i className="fa-solid fa-floppy-disk fa-xl"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdatePromptModal
