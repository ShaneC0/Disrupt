import React from "react";

export default function UserTitle(props) {
  return (
    <div id="user-title">
        <h3><i className="fas fa-circle"></i> {props.user.username}</h3>
    </div>
  );
}
