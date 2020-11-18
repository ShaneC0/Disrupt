import React from "react";

export default function UserList(props) {
    return (
      <div id="user-list">
        <div className="title">
          <h3>Members</h3>
        </div>
        <ul>
          {props.users ? (
            props.users.map((user, i) => <li key={i}>{user.username}</li>)
          ) : (
            <li>No users loaded</li>
          )}
        </ul>
      </div>
    );
}
