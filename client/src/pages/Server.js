import React from "react";

import ChannelList from "../components/ChannelList";
import UserList from "../components/UserList";
import ChannelTitle from "../components/subcomponents/ChannelTitle";
import UserTitle from "../components/subcomponents/UserTitle";

export default function Server(props) {
  return (
    <>
      <UserTitle user={props.user}/>
      <ChannelTitle />
      <ChannelList serverName={props.server.name} channels={props.channels} />

      <UserList users={props.users} />
      <div id="server">Hey</div>
    </>
  );
}
