import React from "react";

export default function ChannelTitle(props) {
  return (
    <div id="channel-title">
        <h4># Channel Name</h4>
        <h4>Join Code: {props.serverId}</h4>
    </div>
  );
}
