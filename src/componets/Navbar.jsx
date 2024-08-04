import './Navbar.css'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBook } from 'react-icons/fa'; // Import the book icon from FontAwesome

export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
          <a className="navbar-brand" href="#">Welcome To Birzeit Library</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link" to='/SignIN'>Sign in</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to='/SignUp'>Register</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to='/'>Categories</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to='/Shop'>Shop</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/cart"> Cart
                <FaBook size={28} /> {/* Replace ShoppingCart with FaBook */}

                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to='/Contact'>Contact Us </NavLink>
              </li>
            </ul>
          </div>
      </div>
    </nav>

  )
}
