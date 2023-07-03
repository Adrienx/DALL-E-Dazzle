const db = require('../db')
const { GalleryImage } = require('./models')

const main = async () => {
    const GalleryImages = [
        {
            imageUrl: "https://res.cloudinary.com/dblhmvfmy/image/upload/v1688413361/img-JRkLt305Rn9MgYl6dEmGwZtW_vuu3qj.png",
            prompt: "italian greyhound smoking a joint"
        }
    ]
    await GalleryImage.insertMany(GalleryImages)
    console.log('gallery images created') // checking images seed to db
}

const run = async () => {
    await main()
    db.close()
}
run()