import React from "react";

export default function SignupForm(props) {
  return (
    <form>
      <h2>Create account</h2>

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

      <div className="form-group">
        <label>CONFIRM PASSWORD</label>
        <input
          type="password"
          onChange={(e) => props.handleChange(e)}
          name="confirmPassword"
        />
      </div>

      <button onClick={(e) => props.onSubmit(e)}>Sign up</button>
      
      <div className="helper-text">
        <p>Have an account?</p> &nbsp;
        <span onClick={props.switchAuth}>Log in</span>
      </div>
    </form>
  );
}
