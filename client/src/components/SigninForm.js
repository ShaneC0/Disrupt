import React from "react";

export default function SigninForm(props) {
  return (
    <form>
      <h2>Sign in</h2>

      {props.errors.length > 0 ? (
        <div className="error-group">
          {props.errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <div className="form-group">
        <label>USERNAME</label>
        <input
          type="text"
          onChange={(e) => props.handleChange(e)}
          name="username"
        />
      </div>

      <div className="form-group">
        <label>PASSWORD</label>
        <input
          type="password"
          onChange={(e) => props.handleChange(e)}
          name="password"
        />
      </div>

      <button onClick={(e) => props.onSubmit(e)}>Submit</button>

      <div className="helper-text">
        <p>Don't have an account?</p> &nbsp;
        <span onClick={props.switchAuth}>Create one</span>
      </div>
    </form>
  );
}
