import React from "react";

export default function CreateChannelForm(props) {
  return (
    <form className="modal">
      <h2>Create channel</h2>

      {props.errors.length > 0 ? (
        <div className="error-group">
          {props.errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <div className="form-group">
        <label>CHANNEL NAME</label>
        <input
          type="text"
          onChange={(e) => props.handleChange(e)}
          name="createChannelName"
        />
      </div>
      <button onClick={(e) => props.submit(e)}>Create</button>
    </form>
  );
}
