import React from "react";

export default function SignupForm({
  switchAuth,
  handleChange,
  submit,
  errors,
}) {
  return (
    <form className="auth-form">
      <h1>Disrupt</h1>

      <div className="form-group">
        <label>Username</label>
        <input
          className={
            errors.filter((err) => err.includes("username")).length > 0
              ? "error-input"
              : ""
          }
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        {errors.length > 0
          ? errors
              .filter((err) => err.includes("username"))
              .map((err, i) => <p key={i}>{err}</p>)
          : null}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          className={
            errors.filter((err) => err.includes("password")).length > 0
              ? "error-input"
              : ""
          }
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        {errors.length > 0
          ? errors
              .filter((err) => err.includes("password"))
              .map((err, i) => <p key={i}>{err}</p>)
          : null}
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
