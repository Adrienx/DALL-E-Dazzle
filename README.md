# DALL-E-Dazzle

## Team

- **Rustam**:
  - GitHub: [https://github.com/RustamBoura]
  - LinkedIn: [https://www.linkedin.com/in/rustamboura/]
- **Adrien**:
  - GitHub: [https://github.com/Adrienx]
  - LinkedIn: [https://www.linkedin.com/in/legend1/]
- **Elliot**:

  - GitHub: [https://github.com/elliotvhill]
  - LinkedIn: [https://www.linkedin.com/in/elliotvhill/]

## Description

DALL-E-Dazzle is a full-stack MERN application leveraging OpenAI's DALL-E 2 AI image generation model. It allows users to create, save, and categorize AI-generated images based on prompts, like images, and access them via a Favorites page. Images can be downloaded or shared to social media.

# Summary of Responsibilities

- **Rustam**: Implement User model and Google OAuth; develop UserLogin, UserProfile, and FavoriteImages components; build "like" feature
- **Adrien**: Create integration with DALL-E 2 model; build CreateImage and CreatePrompt components; develop AI chatbot for prompt creation assistance
- **Elliot**: Handle image upload to Cloudinary and saving data to MongoDB; develop the image sharing feature; build BrowseImages component and search functionality

## Proposed Features

1. Users can log in and authenticate to their own user account using Google auth. This user account will store users' prompts, generated images, and images on the website that they have liked. It will also store a username (email) and password that is separate from the OAuth. Users will also be able to Logout (CRUD) - Rustam
2. Allow users to like images. They can then access these liked images via a Favorites page. - Rustam
3. Create AI generated images based on prompts. - Adrien
4. Ask an AI chatbot for assistance in creating an image generation prompt based on inputs. - Adrien
5. Save and categorize the prompts that users like for future inspiration (CRUD). - Adrien
6. The generated image and its prompt will be saved to MongoDB and uploaded to Cloudinary. (The Cloudinary image links will be used to display images on the website) - Elliot
7. Users will be able to download these images or share them to popular social media websites - Elliot
8. Browse (search) for images on the website that have been created. Search will be based on the prompt descriptions associated with each image. - Elliot

## Component Hierarchy Structure

App
├── Header
├── Nav
└── Main
├── Home
├── UserLogin
├── UserProfile
│ ├── UserInfo
│ ├── UserSettings
│ ├── ChangeEmail
│ └── ChangePassword
├── ImageCreator
│ └── CreatePrompt
├── ImageGallery
│ ├── FavoriteImages
│ └── BrowseImages

## Technologies

- MongoDB
- Express
- React (created with Vite)
- Node.js
- Google OAuth
- Cloudinary
- DALL-E2

## Future Updates

- Support for multiple image download formats
- Integration with more social media platforms for sharing
- More AI models for image generation

## Getting Started

Visit our deployed site [here](TBD) and check out our Trello board [here](https://trello.com/b/KEdnIMvK/dall-e-dazzle).
