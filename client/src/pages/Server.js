import React from "react";

import ChannelList from "../components/ChannelList";
import UserList from "../components/UserList";

export default class Server extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <>
        <ChannelList serverName={this.props.server.name}/>
        <UserList users={this.props.users}/>
        <div id="server">stuff goes here i guess</div>
      </>
    );
  }
}
