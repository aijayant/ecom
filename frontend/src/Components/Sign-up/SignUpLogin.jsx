import React, { useState } from 'react'
import './SignUpLogin.css'
import { RxCross2 } from "react-icons/rx";

const SignUpLogin = ({ setShowSignUp }) => {

  const [currentState, setCurrentState] = useState("Sign Up")

  return (
    <div className="Signup-main">

      <form className="signup-page-popup">

        <div className="signup-page-title">
          <h2>{currentState}</h2>
          <RxCross2 className='cross-icon' onClick={() => setShowSignUp(false)} />
        </div>

        <div className="sign-page-inputs">
          {currentState === 'Login' ? <></> : <input type="text" name="" placeholder='Your name' required />}
          <input type="email" name="" placeholder='Your email' required />
          <input type="password" name="" placeholder='Password' required />
        </div>

        <button>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="sign-page-condition">
          <input type="checkbox" name="" required />
          <p>By continuing, I agree to the terms of use & privacy Policy.</p>
        </div>
        {currentState === "Login"
          ? <p>Create a new account ? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
          : <p>Already have an Account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>}


      </form>
    </div>
  )
}

export default SignUpLogin