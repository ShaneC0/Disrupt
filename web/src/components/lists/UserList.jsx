import React from "react";

export default function UserList({ users, owner }) {
  return (
    <div className="bg-coolGray-700 flex flex-col">
      <p>Owner</p>
      {owner ? (
        <button className="channel-button">{owner.username}</button>
      ) : null}

      <p>Users</p>
      {users.length > 0
        ? users
            .filter((user) => user.username !== owner.username)
            .map((user) => (
              <button className="channel-button">
                <p>{user.username}</p>
              </button>
            ))
        : null}
    </div>
  );
}
