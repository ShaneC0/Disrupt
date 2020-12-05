import React from "react";

export default function SigninForm({
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
          className={errors.length > 0 ? "error-input" : ""}
          type="text"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
          name="username"
        />
        {errors.length > 0
          ? errors.map((err, i) => <p key={i}>{err}</p>)
          : null}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          className={errors.length > 0 ? "error-input" : ""}
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
