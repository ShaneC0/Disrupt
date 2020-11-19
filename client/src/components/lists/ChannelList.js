import React from "react";

import ServerTitle from "../titles/ServerTitle";

export default function ChannelList(props) {
  return (
    <>
    <ServerTitle serverName={props.serverName} />
    <div id="channel-list">
      

      <div className="subtitle">
        <h5>Channels</h5>
        <h5>
          <i className="fas fa-plus"></i>
        </h5>
      </div>

      {props.channels ? (
        props.channels.map((channel, i) => (
          <button className="btn-list" key={i}>
            # {channel.name}
          </button>
        ))
      ) : (
        <p>No channels</p>
      )}
    </div>
    </>
  );
}
