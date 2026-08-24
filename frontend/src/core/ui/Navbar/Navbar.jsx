import React from 'react'
import './Navbar.css'
import { FaSearch } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'

/**
 * Global Navbar — shared UI component.
 * Accepts `setShowSignUp` for backward compat during migration.
 * TODO: Replace with useAuth hook once auth feature is wired up.
 */
const Navbar = ({ setShowSignUp }) => {
  return (
    <div className="navbar-main">
      <div className="navbar">
        <Link to="/" className="main-logo-text">ShopSphere</Link>

        <div className="serach-function">
          <div className="search-icon-div">
            <FaSearch className="serach-icon" />
          </div>
          <input
            className="search-box"
            type="text"
            placeholder="Search here..."
          />
        </div>

        <div className="main-right">
          <Link to="/profile">
            <CgProfile className="Profile-icon" />
          </Link>
          <Link to="/cart" className="cart-section">
            <div className="cart-icon">
              <AiOutlineShoppingCart />
            </div>
          </Link>
          <button onClick={() => setShowSignUp?.(true)}>Login</button>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Navbar
