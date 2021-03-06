import React from "react";

export default function UserList({ users, owner }) {
  return (
    <div className="bg-coolGray-700 flex flex-col">
      <p className="text-lg mx-2">Owner</p>
      {owner ? (
        <button className="list-button text-sm">{owner.username}</button>
      ) : null}

      <p className="text-lg mx-2">Users</p>
      {users.length > 0
        ? users
            .filter((user) => user.username !== owner.username)
            .map((user, i) => (
              <button className="list-button text-sm" key={i}>
                <p>{user.username}</p>
              </button>
            ))
        : null}
    </div>
  );
}
