import React from "react";

export default function ChannelList({channels}) {
  return <div className="">
    {channels.length > 0 ? channels.map(channel => <p>{channel.name}</p>) : null}
  </div>;
}
