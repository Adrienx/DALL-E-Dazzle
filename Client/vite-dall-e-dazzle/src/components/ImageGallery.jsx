import React, { useState, useContext } from "react"
import DataContext from "../DataContext"

export default function ImageGallery() {
  const { allPosts, setAllPosts } = useState(null)
  return (
    <div className="card">
      <h2> Gallery Page</h2>
    </div>
  )
}
