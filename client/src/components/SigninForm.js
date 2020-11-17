import React from "react";

export default function SigninForm(props) {
  return (
    <form>
      <h2>Sign in</h2>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => props.handleChange(e)}
          placeholder="Username"
          name="username"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => props.handleChange(e)}
          placeholder="Password"
          name="password"
        />
      </div>

      <button onClick={(e) => props.onSubmit(e)}>Submit</button>
    </form>
  );
}
