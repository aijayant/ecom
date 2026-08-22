import React from 'react'
import "./Navbar.css"
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";

const Navbar = ({ setShowSignUp }) => {
  return (
    <div className="navbar-main">

      <div className='navbar'>
        {/* <h1 className='main-logo-text'>ShopSphere</h1> */}
        <div className="logo">
          <LiaShoppingBagSolid className='shopping-Bag-icon'/>
          <p>Shop<span>Sphere</span></p>

        </div>

        <div className="serach-function">
          <div className="search-button">
            <FaSearch className='search-icon' />
          </div>
          <input className='search-input' type="text" name="" id="" placeholder='Search for products, brands and more...' />
        </div>

        <div className="main-right">

          <div className='profile-icon'>
            <CgProfile className='cart-fav-cart-icon' />
            <p>profile</p>
          </div>

          <div className="wishlist">
            <CiHeart className='cart-fav-cart-icon' />
            <p>Wishlist</p>
          </div>

          <div className='cart-section'>
              <AiOutlineShoppingCart className='cart-fav-cart-icon' />
              <p>Cart</p>
          </div>
          <button onClick={() => setShowSignUp(true)}>Login</button>
        </div>
         
      </div>
      <hr />
    </div>
  )
}

export default Navbar