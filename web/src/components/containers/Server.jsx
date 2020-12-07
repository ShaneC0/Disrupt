import React from "react";

import { API_URL } from "../../constants";

import ChannelList from "../lists/ChannelList.jsx"
import UserList from "../lists/UserList.jsx"

export default class Server extends React.Component {
  /*
        The server component state consists of a servers:
         - Channels
         - Users
         - owner

        The server component houses:
         - Channel Component
         - Channel list
         - User list

        TODO:
         - Style title Components
         - Style list components

    */

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      owner: null,
      channels: [],
      currentChannel: null,
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `${API_URL}/server/info/${this.props.server.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    const data = await response.json();

    this.setState({
      users: data.users,
      owner: data.owner,
      channels: data.channels,
      currentChannel: data.channels[0],
    });
  }

  render() {
    return (
      <div className="grid grid-rows-server grid-cols-server">
        <div className="border">
          <p>{this.props.server.name}</p>
        </div>

        <div className="border">
          <p>
            {this.state.currentChannel ? this.state.currentChannel.name : null}
          </p>
        </div>

        <div className="border">
          <h1>Users Title</h1>
        </div>

        <ChannelList channels={this.state.channels}/>

        <div className="border">
          <h1>Message List</h1>
        </div>

        <UserList users={this.state.users}/>

        <div className="border">
          <p>{this.props.user.username}</p>
        </div>

        <div className="border">
          <h1>Message input box</h1>
        </div>

        <div className="border">
          <h1>@ShaneC0</h1>
        </div>
      </div>
    );
  }
}
