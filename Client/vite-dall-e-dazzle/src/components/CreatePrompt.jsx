import { useState, useEffect } from "react"
import axios from "axios"

const CreatePrompt = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [prompts, setPrompts] = useState([])
  const [categoryType, setCategoryType] = useState("existing")

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Populate categories
  useEffect(() => {
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleCreatePrompt = async (event) => {
    event.preventDefault()

    // Validate inputs
    if (
      !title ||
      !description ||
      (categoryType === "existing" && !selectedCategoryId) ||
      (categoryType === "new" && !newCategory)
    ) {
      console.log("Please fill all the required fields.")
      console.log(`Selected Category ID: ${selectedCategoryId}`)
      console.log(`New Category: ${newCategory}`)
      return
    }

    let promptCategory = categoryType === "existing" ? selectedCategoryId : ""

    // If the new category option is checked and newCategory is not empty, create a new category
    if (categoryType === "new" && newCategory) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/promptCategories",
          { name: newCategory }
        )

        // Set promptCategory to the id of the new category
        promptCategory = response.data._id

        setNewCategory("") // Clear new category field
        setCategories([...categories, response.data]) // Append new category to list
      } catch (error) {
        console.error("Error:", error)
      }
    }

    // Actually Create the new prompt
    try {
      const response = await axios.post("http://localhost:3001/api/prompts", {
        title,
        description,
        category: promptCategory,
      })

      setTitle("") // Reset the title field
      setDescription("") // Reset the description field
      setSelectedCategoryId("") // Reset the category selection field

      const newPrompt = response.data

      setPrompts([...prompts, newPrompt]) // Append new prompt to list

      // Update category in state
      if (categoryType === "existing") {
        setCategories(
          categories.map((category) =>
            category._id === promptCategory
              ? { ...category, prompts: [...category.prompts, newPrompt] }
              : category
          )
        )
      }

      console.log("Prompt created:", newPrompt)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSearchPrompts = async (event) => {
    event.preventDefault()
    if (selectedCategoryId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/prompts/category/${selectedCategoryId}`
        )
        setPrompts(response.data)
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  return (
    <>
      {/* Creation form */}
      <form onSubmit={handleCreatePrompt}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>
          <input
            type="radio"
            value="existing"
            checked={categoryType === "existing"}
            onChange={(e) => setCategoryType(e.target.value)}
          />
          Select existing category
        </label>
        {categoryType === "existing" && (
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
        )}

        <label>
          <input
            type="radio"
            value="new"
            checked={categoryType === "new"}
            onChange={(e) => setCategoryType(e.target.value)}
          />
          Create new category
        </label>
        {categoryType === "new" && (
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        )}

        <button type="submit">Create Prompt</button>
      </form>

      {/* Search form */}
      <form onSubmit={handleSearchPrompts}>
        <label>Choose Category:</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          required
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit">Search Prompts</button>
      </form>

      {/* Display results */}
      {prompts.map((prompt) => (
        <div key={prompt._id}>
          <h2>{prompt.title}</h2>
          <p>{prompt.description}</p>
        </div>
      ))}
    </>
  )
}

export default CreatePrompt
