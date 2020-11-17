import React, { useState } from "react";

import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";

export default function Landing() {
  const [authMethod, setAuthMethod] = useState("signup");

  return (
    <div id="landing">
      <div className="text-group">
        <h1>Disrupt</h1>
        <div className="btn-group">
          {authMethod === "signup" ? (
            <button onClick={() => setAuthMethod("signin")}>Sign in</button>
          ) : (
            <button onClick={() => setAuthMethod("signup")}>
              Create account
            </button>
          )}
        </div>
      </div>

      {authMethod === "signup" ? <SignupForm /> : <SigninForm />}
    </div>
  );
}
