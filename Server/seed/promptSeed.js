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
    "Cosmic Art",
    "Abstract Conceptual Art",
    "Nature's Narrative",
    "Expressive Human Art",
    "Dreamscape Design",
  ]

  // Define prompts
  const prompts = [
    {
      title: "The Symphony of the Cosmos",
      description:
        "Visualize a cosmic orchestra where celestial bodies, from swirling galaxies to radiant stars, are instruments in a grand symphony of the universe. Each note is a burst of cosmic energy.",
      category: "Cosmic Art",
    },
    {
      title: "Temporal Tapestry",
      description:
        "Illustrate the abstract concept of time as a grand tapestry being woven by ageless beings. The threads represent moments, intertwining and influencing one another in complex patterns.",
      category: "Abstract Conceptual Art",
    },
    {
      title: "Whispers of the Forest",
      description:
        "Depict a serene forest where every creature, tree, and leaf seems to be sharing stories in hushed whispers. Their communication forms an invisible network of pulsating energy.",
      category: "Nature's Narrative",
    },
    {
      title: "The Dance of Emotions",
      description:
        "Create a dynamic dance scene where each dancer personifies a different emotion. The movements, colors, and expressions should provide a deeper understanding of our emotional spectrum.",
      category: "Expressive Human Art",
    },
    {
      title: "The Architecture of Dreams",
      description:
        "Picture an ethereal cityscape that is influenced by the fluid and fantastical architecture of our dreams. Gravity-defying structures and impossible geometry are the norm here.",
      category: "Dreamscape Design",
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
