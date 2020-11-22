import React from "react";

export default function MessageList(props) {
  //displays a list of messages
  //takes in a list of messages as props

  return (
    <div id="message-list">
      {props.messages.length > 0 ? (
        props.messages.map((message, i) => (
          <div key={i} className="message">
            <div className="message-header">
              <h4>{message.user.username}</h4>
              <p>{message.createDate}</p>
            </div>

            <p>{message.text}</p>
          </div>
        ))
      ) : (
        <div id="message-helper">
          <h1>No messages yet. Be the first!</h1>
        </div>
      )}
    </div>
  );
}
