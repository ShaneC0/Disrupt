import React from "react";

export default function ServerList(props) {
  return (
    <div id="server-list">
      {props.servers
        ? props.servers.map((server, i) => (
            <button onClick={() => props.setServer(server)} key={i}>
              {server.name.charAt(0)}
            </button>
          ))
        : null}
      <button>
        <i className="fas fa-link"></i>
      </button>
      <button onClick={() => props.toggleServerForm()}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}
