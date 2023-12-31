import React, { useState, useEffect } from "react"
import axios from "axios"

const DeleteCategoryModal = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

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

  // useEffect to fetch the categories once at component load time for the dropdown list
  useEffect(() => {
    fetchCategories()
  }, [])

  //  Handle Category deletion
  const handleCategoryDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this category and all its prompts?"
      )
    ) {
      try {
        await axios.delete(
          `http://localhost:3001/api/promptCategories/${selectedCategoryId}`
        )
        setCategories(
          categories.filter((category) => category._id !== selectedCategoryId)
        )
        setSelectedCategoryId("") // Reset the selected category
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  return (
    <>
      <button
        className="btn"
        onClick={() => setModalOpen(true)}
        disabled={!categories.length} // Button disabled if categories.length is "false" or "0", ie no categories left.
        title={categories.length ? "" : "No categories available"} // If categories array length is "0"/empty, then disaplay msg.
      >
        Delete Category
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
            <form
              className="search-form modal-form"
              onSubmit={(e) => {
                e.preventDefault()
                handleCategoryDelete()
              }}
            >
              <div className="modal-inputs">
                <div className="flex-label-existing">
                  <label>Select a Category: </label>
                </div>
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
              </div>
              <button title="Delete Entire Category" type="submit">
                {" "}
                <i className="far fa-trash-alt fa-xl"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteCategoryModal
