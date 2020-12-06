import React from "react";

import { FiLogOut, FiPlus, FiLink } from "react-icons/fi";

export default function ServerList({ servers, logout }) {
  return (
    <div className="bg-coolGray-900 flex flex-col items-center justify-between py-4">
      <div className="flex flex-col w-full items-center">
        {servers
          ? servers.map((server, i) => (
              <button className="server-button" key={i}>
                {server.name.charAt(0)}
              </button>
            ))
          : null}
      </div>
      <div className="flex flex-col w-full items-center">
        <button className="server-button">
          <FiPlus />
        </button>
        <button className="server-button">
          <FiLink />
        </button>
        <button
          className="server-button bg-coolGray-800 mb-0 hover:bg-rose-400"
          onClick={() => logout()}
        >
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}
