import React from "react";

export default function ServerList(props) {
  //displays a list of servers
  //has buttons to toggle create and join server forms on main component
  //takes in a list of servers as props

  return (
    <div id="server-list">
      {props.servers
        ? props.servers.map((server, i) => (
            <button
              onClick={() => props.setServer(server)}
              key={i}
              className={
                props.currentServer && props.currentServer.id === server.id
                  ? "active"
                  : ""
              }
            >
              {server.name.charAt(0).toUpperCase()}
              {server.name.charAt(1).toLowerCase()}
            </button>
          ))
        : null}
      <button onClick={() => props.toggleJoinForm()}>
        <i className="fas fa-link"></i>
      </button>
      <button onClick={() => props.toggleCreateForm()}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}
