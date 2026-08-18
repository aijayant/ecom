import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const SignUpLogin = ({ setShowSignUp }) => {
  const [signUp, setSignUp] = useState("Sign-up")
  return (
    <div className="Signup-main">
      <form className="signup-popup">
        <div className="signup-title">
          <h2>{signUp}</h2>
          <RxCross2 onClick={() => setShowSignUp(false)} />
        </div>

      </form>
    </div>
  )
}

export default SignUpLogin