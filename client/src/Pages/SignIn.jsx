import React, { useState } from 'react';
import { useAuth, SignedOut } from "@clerk/clerk-react";

const SignIn = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <>
      <SignedOut>
        <button onClick={() => setShowSignIn(true)}>
          Login
        </button>

      </SignedOut>
    </>
  )
}

export default SignIn