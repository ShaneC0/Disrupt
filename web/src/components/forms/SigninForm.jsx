import React from "react";

export default function SigninForm({ switchAuth, handleChange, submit }) {
  return (
    <form className="auth-form">
      <h1>Disrupt</h1>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
          name="username"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
          name="password"
        />
      </div>

      <button onClick={(e) => submit(e)}>Sign in</button>

      <p>
        Don't have an account? <a onClick={() => switchAuth()}>Create one.</a>
      </p>
    </form>
  );
}
