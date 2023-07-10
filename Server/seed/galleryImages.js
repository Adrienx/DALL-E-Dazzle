const db = require('../db')
const { GalleryImage } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
const main = async () => {
    await GalleryImage.deleteMany({ })
    const GalleryImages = [
        {
            imageUrl: "https://res.cloudinary.com/dall-e-dazzle/image/upload/v1688413361/img-JRkLt305Rn9MgYl6dEmGwZtW_vuu3qj.png",
            prompt: "italian greyhound smoking a joint",
            favorite: false
        },
        {
            imageUrl: "https://res.cloudinary.com/dall-e-dazzle/image/upload/v1688569190/dall-e-dazzle/img-EmUKRPuekJ7x2S2dgbvw6rRx_kpfzyn.png",
            prompt: "A team of mech warriors standing on a cliff overlooking a neon-illuminated dystopian city",
            favorite: false
        },
        {
            imageUrl: "https://res.cloudinary.com/dall-e-dazzle/image/upload/v1688569190/dall-e-dazzle/img-Scu0JBQ4nrOA5dSBc7tRr8JN_xd9yse.png",
            prompt: "A team of mech warriors standing on a cliff overlooking a neon-illuminated dystopian city",
            favorite: false
        },
        {
            imageUrl: "https://res.cloudinary.com/dall-e-dazzle/image/upload/v1688569191/dall-e-dazzle/img-EQJYCjHA12HqjTue5puNrF4H_cms4f4.png",
            prompt: "A team of mech warriors standing on a cliff overlooking a neon-illuminated dystopian city",
            favorite: false
        },
        {
            imageUrl: "https://res.cloudinary.com/dall-e-dazzle/image/upload/v1688569499/dall-e-dazzle/img-e93KWGKVsp6g3T9hGfvfRlvQ_uaicpj.png",
            prompt: "An ancient tree with glowing symbols carved into its bark in a bioluminescent forest",
            favorite: false
        }
    ]
    await GalleryImage.insertMany(GalleryImages)
    console.log('Gallery images created!') // checking images seed to db
}

const run = async () => {
    await main()
    db.close()
}
run()