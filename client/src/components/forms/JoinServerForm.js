import React from "react";

export default function CreateServerForm(props) {
  return (
    <form className="modal">
      <h2>Join a server</h2>

      {props.errors.length > 0 ? (
        <div className="error-group">
          {props.errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <div className="form-group">
        <label>JOIN CODE</label>
        <input
          type="text"
          onChange={(e) => props.handleChange(e)}
          name="joinServerCode"
        />
      </div>
      <button onClick={(e) => props.joinServer(e)}>Create</button>
    </form>
  );
}
