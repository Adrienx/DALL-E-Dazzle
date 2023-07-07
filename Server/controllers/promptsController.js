const { Prompt, PromptCategory } = require("../models")

exports.index = async (req, res) => {
  try {
    const prompts = await Prompt.find()
    res.json(prompts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.create = async (req, res) => {
  const { title, description, category } = req.body

  try {
    // Create a new prompt
    const newPrompt = new Prompt({
      title,
      description,
      category,
    })

    await newPrompt.save()
    console.log("New prompt created: ", newPrompt)

    // The ID of the newly created prompt is added to the 'prompts' array of the selected category.
    const updatedCategory = await PromptCategory.findByIdAndUpdate(
      category,
      {
        $push: { prompts: newPrompt._id },
      },
      { new: true } //returns the updated document, which includes the newly added prompt ID.
    )

    console.log("Updated category: ", updatedCategory)

    res.status(201).json(newPrompt)
  } catch (error) {
    console.log("Error occurred: ", error.message)
    res.status(500).json({ error: error.message })
  }
}

exports.show = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id)
    res.json(prompt)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.update = async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }) //returns the updated document,
    res.json(prompt)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.delete = async (req, res) => {
  try {
    const promptId = req.params.id
    // Find prompt document by ID and remove
    await Prompt.findByIdAndRemove(promptId)

    // Update user and category documents to remove reference to deleted prompt
    // const user = await User.findOne({ prompts: { $in: [promptId] } })
    const category = await PromptCategory.findOne({
      prompts: { $in: [promptId] },
    })

    // Pull the prompt ID from the user and category prompts arrays
    // if (user) {
    //   user.prompts.pull(promptId)
    //   await user.save()
    // }
    if (category) {
      category.prompts.pull(promptId)
      await category.save()
    }

    res.json({ message: "Prompt successfully deleted." })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.findByCategory = async (req, res) => {
  try {
    const prompts = await Prompt.find({
      category: req.params.categoryId,
    }).populate("category")
    res.json(prompts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
