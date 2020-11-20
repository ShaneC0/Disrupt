import React from "react";

import ChannelList from "../components/lists/ChannelList";
import UserList from "../components/lists/UserList";

import ServerTitle from "../components/titles/ServerTitle";
import ChannelTitle from "../components/titles/ChannelTitle"
import UserTitle from "../components/titles/UserTitle";

export default class Server extends React.Component {
  //stores server data i.e. users, channels
  //contains the channel list, user list
  //takes a server as prop

  constructor(props) {
    super(props);

    this.state = {
      channels: null,
      currentChannel: null,
      users: null,
    };

    this.setChannel = this.setChannel.bind(this)
  }

  async fetchChannels() {
    const response = await fetch(
      `http://localhost:6969/api/v1/channel/server/${this.props.server.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
    } else {
      this.setState({ channels: data.channels });
    }
  }

  async fetchUsers() {
    const response = await fetch(
      `http://localhost:6969/api/v1/server/users/${this.props.server.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
    } else {
      this.setState({ users: data.users });
    }
  }

  async componentDidMount() {
    await this.fetchChannels();
    await this.fetchUsers();
  }

  async componentDidUpdate(prevProps) {
    if(this.props.server !== prevProps.server) {
        await this.fetchChannels()
        await this.fetchUsers()
    }
  }

  setChannel(channel) {
    this.setState({currentChannel: channel})
  }

  render() {
    return (
        <>
        <ServerTitle serverName={this.props.server.name} />
        <ChannelTitle serverId={this.props.server.id} channelName={this.state.currentChannel ? this.state.currentChannel.name : ""} />  
        <UserTitle username={this.props.username} />
        {this.state.channels ? <ChannelList channels={this.state.channels} setChannel={this.setChannel} /> : null}
        {this.state.users ? <UserList users={this.state.users} /> : null}
        </>
    )
  }
}
