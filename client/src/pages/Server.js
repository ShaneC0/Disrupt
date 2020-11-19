import React from "react";

import ChannelList from "../components/lists/ChannelList";
import UserList from "../components/lists/UserList";
import ChannelTitle from "../components/titles/ChannelTitle";
import UserTitle from "../components/titles/UserTitle";

export default function Server(props) {
  return (
    <>
      <UserTitle user={props.user}/>
      <ChannelTitle serverId={props.server.id}/>
      <ChannelList serverName={props.server.name} channels={props.channels} />

      <UserList users={props.users} />
      <div id="server">Hey</div>
    </>
  );
}
