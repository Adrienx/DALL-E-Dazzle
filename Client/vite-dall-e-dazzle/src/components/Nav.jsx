import { NavLink } from "react-router-dom"

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/CreateImage"> Generate Image</NavLink>
        </li>
        <li>
          <NavLink to="/ImageGallery"> Gallery</NavLink>
        </li>
        <li>
          <NavLink to="/UserProfile"> User Profile</NavLink>
        </li>
        <li>
          <NavLink to="/UserLogin"> User Login</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
