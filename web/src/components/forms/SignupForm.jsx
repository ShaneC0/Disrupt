import React from "react";

export default function SignupForm({ switchAuth, handleChange, submit }) {
  /*
  IDEAS FOR HANDLING ERRORS:
    - Store object in state with individual keys for each inputs errors
    - I can search through errors for a fields errors with "find" function
  */
  return (
    <form className="auth-form">
      <h1>Disrupt</h1>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <p>Username must be at least 2 characters long</p>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <p>Password must be at least 8 characters long</p>
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
      </div>

      <button onClick={(e) => submit(e)}>Sign up</button>

      <p>
        Already have an account? <a onClick={() => switchAuth()}>Sign in.</a>
      </p>
    </form>
  );
}
