import React from "react";

export default function ChannelList(props) {
  //displays a list of channels
  //takes in a list of channels as props

  return (
    <div id="channel-list">
      <div className="title">
        <h3>Channels</h3>
        <h3><i className="fas fa-plus"></i></h3>
      </div>
      <div className="btn-list">
        {props.channels
          ? props.channels.map((channel, i) => (
              <button onClick={() => props.setChannel(channel)} key={i}># {channel.name}</button>
            ))
          : null}
      </div>
    </div>
  );
}
