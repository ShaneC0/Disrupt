import React from "react";

import ChannelList from "../components/ChannelList";
import UserList from "../components/UserList";
import ChannelTitle from "../components/subcomponents/ChannelTitle";

export default function Server(props) {
  return (
    <>
      <ChannelList
        serverName={props.server.name}
        channels={props.channels}
      />
      <UserList users={props.users} />
      <ChannelTitle />
      <div id="server">Hey</div>
    </>
  );
}
