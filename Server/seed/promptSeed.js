const { DBRef } = require("bson")
const db = require("../db")
const Prompt = require("../models/Prompt")
const Category = require("../models/PromptCategory")

// seed the database
const seedDB = async () => {
  // Delete all existing Prompts, and Categories
  await Prompt.deleteMany({})
  await Category.deleteMany({})

  // Define categories
  const categories = [
    "SEO",
    "Writing/Blogging",
    "Analyzing Data",
    "Reading",
    "General",
  ]

  // Define prompts
  const prompts = [
    {
      title: "Meta Tag best Practice",
      description: "Research the best meta tags for [topic]",
      category: "SEO",
    },
    {
      title: "Financial Planning blog help",
      description: "Blog post on [financial planning]?",
      category: "Writing/Blogging",
    },
    {
      title: "Create Table from Data",
      description: "Can you create a table from this data?: [your data]",
      category: "Analyzing Data",
    },
    {
      title: "Text Summary",
      description: "Can you please summarize this article for me? [your text]",
      category: "Reading",
    },
    {
      title: "Interview Help",
      description:
        "I'm interviewing for a software engineer position, can you give me some interview questions? ",
      category: "General",
    },
  ]

  // loop over each category in array and save to db
  for (let category of categories) {
    const newCategory = new Category({ name: category })
    await newCategory.save()
  }

  // loop over each prompt in array, find the category in db that matches its category
  for (let prompt of prompts) {
    const category = await Category.findOne({ name: prompt.category })

    // create a new Prompt instance with the title and description of the prompt and the id of the category that was found in db
    const newPrompt = new Prompt({
      title: prompt.title,
      description: prompt.description,
      category: category._id,
    })

    // save new prompt to db, then rinse an repeat for each prompt in array
    await newPrompt.save()

    // add this prompt to the prompts array of the category
    category.prompts.push(newPrompt._id)

    // save the category
    await category.save()
  }
}

seedDB().then(() => {
  db.close()
})
