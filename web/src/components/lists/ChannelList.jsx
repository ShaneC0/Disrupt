import React from "react";

export default function ChannelList({ channels, setChannel }) {
  return (
    <div className="bg-coolGray-700 flex flex-col">
      {channels.length > 0
        ? channels.map((channel) => (
            <button
              className="channel-button"
              onClick={() => setChannel(channel)}
            >
              <p># {channel.name}</p>
            </button>
          ))
        : null}
    </div>
  );
}
