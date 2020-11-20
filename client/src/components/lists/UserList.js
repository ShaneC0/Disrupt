import React from "react";

export default function UserList(props) {
  //displays a list of users
  //takes in a list of users as props

  return (
    <div id="user-list">
      <div className="btn-list">
        {props.users
          ? props.users.map((user, i) => (
              <button key={i}>{user.username}</button>
            ))
          : null}
      </div>
    </div>
  );
}
