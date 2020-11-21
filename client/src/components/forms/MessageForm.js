import React from "react";

export default function MessageForm(props) {
  return (
    <form id="message-form">
      <input
        type="text"
        onChange={(e) => props.handleChange(e)}
        name="message"
        placeholder="Type a message here to start chatting!"
      />
      <button onClick={(e) => props.submit(e)}>Send</button>
    </form>
  );
}
