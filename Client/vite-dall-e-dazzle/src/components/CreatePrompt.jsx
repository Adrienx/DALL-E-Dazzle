import React, { useState, useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form" //https://react-hook-form.com/docs/useform

////////////////////////////////////////////////////////////////////////////////////////////

const CreatePromptModal = () => {
  const { register, handleSubmit, watch } = useForm() //  useForm hook allows the use of "register" (used to register input fields with the form), "handleSubmit" (provides form validation for onSubmit) and "watch" to observe a value and trigger a specific response depending on its state.
  const [categories, setCategories] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const categoryType = watch("categoryType", "existing") //  "existing" is the default value so when the form first renders and the "categoryType" input field doesn't have a value yet, categoryType will be "existing".

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

  const onSubmit = async (data) => {
    let categoryId = data.category
    if (data.categoryType === "new") {
      try {
        const categoryResponse = await axios.post(
          "http://localhost:3001/api/promptCategories",
          { name: data.newCategory }
        )
        categoryId = categoryResponse.data._id
      } catch (error) {
        console.error("Error:", error)
      }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////

    try {
      await axios.post("http://localhost:3001/api/prompts", {
        title: data.title,
        description: data.description,
        category: categoryId,
      })
      alert("Prompt created successfully.")
      setModalOpen(false)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        Open Create New Prompt Modal
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
            {/* // Form that handles the subission for new prompt creation */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                {...register("title", { required: true })}
                id="title"
                name="title"
              />
              <label htmlFor="description">Description:</label>
              <textarea
                {...register("description", { required: true })}
                id="description"
                name="description"
              />
              {/* /////////////////////////////////////////////////////////////////// */}
              {/* // Create prompt using existing category */}
              <input
                type="radio"
                value="existing"
                {...register("categoryType")}
                id="categoryTypeExisting"
              />
              <label htmlFor="categoryTypeExisting">
                Use existing category
              </label>
              {categoryType === "existing" && (
                <select
                  id="categorySelect"
                  name="category"
                  {...register("category", { required: true })}
                >
                  <option value="">Choose a Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
              {/* /////////////////////////////////////////////////////////////////// */}
              {/* // Create prompt using new category */}
              <input
                type="radio"
                value="new"
                {...register("categoryType")}
                id="categoryTypeNew"
              />
              <label htmlFor="categoryTypeNew">Create new category</label>
              {categoryType === "new" && (
                <input
                  type="text"
                  {...register("newCategory", { required: true })}
                  id="newCategory"
                  name="newCategory"
                />
              )}
              {/* /////////////////////////////////////////////////////////////////// */}
              {/* // Create and Cancel buttons */}
              <button type="submit">
                <i className="fa-solid fa-floppy-disk fa-xl">Create</i>
              </button>
              <button onClick={() => setModalOpen(false)} type="button">
                <i className="fa-solid fa-xmark fa-xl">Cancel</i>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePromptModal
