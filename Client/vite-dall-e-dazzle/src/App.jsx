import { useState, useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Main from "./components/Main"
import DataContext from "./DataContext"
import "./App.css"

function App() {
  // DATA TO BE PASSED BY PROVIDER
  const [userInfo, setUserInfo] = useState({
    name: "Jeremy",
    favColor: "blue",
    favFood: "chicken parmesean",
    favMovie: "Goodfellas",
  })

  return (
    <div className="App">
      <DataContext.Provider value={{ userInfo, setUserInfo }}>
        <Header />
        <Main />
      </DataContext.Provider>
    </div>
  )
}

export default App
