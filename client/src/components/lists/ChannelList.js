import React from "react";

export default function ChannelList(props) {
  //displays a list of channels
  //takes in a list of channels as props

  return (
    <div id="channel-list">
      <div className="btn-list">
        {props.channels
          ? props.channels.map((channel, i) => (
              <button key={i}># {channel.name}</button>
            ))
          : null}
      </div>
    </div>
  );
}
