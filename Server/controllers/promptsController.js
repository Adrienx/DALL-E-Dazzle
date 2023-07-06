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

    // Add the new prompt's ID to the user's and category's 'prompts' array
    // await User.findByIdAndUpdate(user, { $push: { prompts: newPrompt._id } })
    await PromptCategory.findByIdAndUpdate(category, {
      $push: { prompts: newPrompt._id },
    })

    res.status(201).json(newPrompt)
  } catch (error) {
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
    })
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
