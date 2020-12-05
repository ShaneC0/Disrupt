import React from "react";

export default function ServerList({ servers }) {
  return (
    <div className="bg-coolGray-900 flex flex-col items-center justify-between">
      <div className="flex flex-col w-full items-center">
        {servers
          ? servers.map((server, i) => (
              <button className="server-button" key={i}>
                {server.name.split(" ")[0]}
              </button>
            ))
          : null}
      </div>
      <div className="flex flex-col w-full items-center">
        <button className="server-button">Create</button>
        <button className="server-button">Join</button>
        <button className="server-button">Logout</button>
      </div>
    </div>
  );
}
