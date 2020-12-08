import React from "react";

export default function ChannelList({ channels }) {
  return (
    <div className="bg-coolGray-700 flex flex-col">
      {channels.length > 0
        ? channels.map((channel) => (
            <button className="channel-button">
              <p># {channel.name}</p>
            </button>
          ))
        : null}
    </div>
  );
}
