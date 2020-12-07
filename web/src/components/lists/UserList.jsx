import React from "react";

export default function UserList({users}) {
  return <div className="">
    {users.length > 0 ? users.map(user => <p>{user.username}</p>) : null}
  </div>;
}
