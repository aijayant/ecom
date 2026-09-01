import React, { useState } from 'react'
import './Navbar.css'
import { FaSearch } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { Link,useNavigate } from 'react-router-dom'

/**
 * Global Navbar — shared UI component.
 * Accepts `setShowSignUp` for backward compat during migration.
 * TODO: Replace with useAuth hook once auth feature is wired up.
 */
const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("")
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.length > 50) {
      setError("Search cannot exceed 50 characters.");
      return;
    }
    console.log(value)

    setSearch(value);

    if (value.trim()) {
      setError("");
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedSearch = search.trim();

    // Validation
    if (!trimmedSearch) {
      setError("Please enter something to search.");
      return;
    }

    if (trimmedSearch.length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }

    setError("");

    // Send search value to parent
    onSearch?.(trimmedSearch);
    setSearch("");
    setError("");
    onSearch?.("");
  };

  

  return (
    <div className="navbar-main">
      <div className="navbar">
        {/* Logo */}
        <Link
          to="/"
          className="text-[30px] font-bold text-primary tracking-tight"
        >
          ECom
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="relative flex w-full max-w-125 flex-col"
        >
          <div
            className={`flex items-center rounded-lg border bg-white px-3 py-2 transition ${error
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary"
              }`}
          >
            <FaSearch className="mr-2 shrink-0 text-primary" />

            <input
              className="w-full bg-transparent outline-none"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={handleChange}
              maxLength={50}
              aria-label="Search products"
              aria-invalid={!!error}
            />
             
            <button
              type="submit"
              className="ml-2 rounded-md bg-primary px-4 py-1.5 text-white transition hover:opacity-90"
            > 
              Search
            </button>
          </div>

          {/* Validation message */}
          {error && (
            <p className="mt-1 text-sm text-red-500">
              {error}
            </p>
          )}
        </form>

        {/* Right section */}
        <div className="main-right">

          <Link to="/profile" aria-label="Profile">
            <CgProfile className="Profile-icon" />
          </Link>

          <Link
            to="/cart"
            className="cart-section"
            aria-label="Shopping cart"
          >
            <div className="cart-icon">
              <AiOutlineShoppingCart />
            </div>
          </Link>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </div>
    </div>
  )
}

export default Navbar
