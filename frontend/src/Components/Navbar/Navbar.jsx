import React from 'react'
import "./Navbar.css"
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ setShowSignUp }) => {
  return (
    <div className="navbar-main">

      <div className='navbar'>
        <h1 className='main-logo-text'>ShopSphere</h1>

        <div className="serach-function">
          <div className="search-icon-div">
            <FaSearch className='serach-icon' />
          </div>
          <input className='search-box' type="text" name="" id="" placeholder='Search here...' />
        </div>

        <div className="main-right">
          <CgProfile className='Profile-icon' />
          <div className="cart-section">
            <div className="cart-icon">
              <AiOutlineShoppingCart />
            </div>
            {/* <p>Cart</p> */}
          </div>
          <button onClick={() => setShowSignUp(true)}>Login</button>
        </div>
      </div>
      <hr />
   </div>
  )
}

export default Navbar