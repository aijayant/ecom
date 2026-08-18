import React, { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import SignUpLogin from './Components/Sign-up/SignUpLogin';
import {  Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';

const App = () => {

  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
        {showSignUp ? <SignUpLogin setShowSignUp={setShowSignUp} /> : <></>}
        <div className="app">
          <Navbar setShowSignUp={setShowSignUp} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            {/* <Route path='/user/sign-up' element={<SignUpLogin />}/> */}
          </Routes>

        </div>
    </>
  )
}

export default App