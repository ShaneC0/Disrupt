import React from "react";

export default function CreateServerForm(props) {
  return (
    <form className="modal">
      <h2>Create server</h2>

      {props.errors.length > 0 ? (
        <div className="error-group">
          {props.errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <div className="form-group">
        <label>SERVER NAME</label>
        <input
          type="text"
          onChange={(e) => props.handleChange(e)}
          name="createServerName"
        />
      </div>
      <button onClick={(e) => props.submit(e)}>Create</button>
    </form>
  );
}
