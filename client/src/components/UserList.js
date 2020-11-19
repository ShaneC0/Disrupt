import React from "react";

export default function UserList(props) {
  return (
    <div id="user-list">
      <ul>
        {props.users ? (
          props.users.map((user, i) => (
            <button className="btn-list" key={i}>
              <i className="fas fa-circle"></i> {user.username}
            </button>
          ))
        ) : (
          <li>No users loaded</li>
        )}
      </ul>
    </div>
  );
}
