import React from "react";

import Channel from "./Channel";

import ChannelList from "../components/lists/ChannelList";
import UserList from "../components/lists/UserList";

import ServerTitle from "../components/titles/ServerTitle";
import ChannelTitle from "../components/titles/ChannelTitle";
import UserTitle from "../components/titles/UserTitle";
import CreateChannelForm from "../components/forms/CreateChannelForm";
import io from "socket.io-client"

let socket


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
      creatingChannel: false,
      createChannelName: "",
      errors: [],
    };

    this.setChannel = this.setChannel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createChannel = this.createChannel.bind(this);
    this.toggleCreateChannelForm = this.toggleCreateChannelForm.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      errors: [],
    });
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
      this.setState({
        channels: data.channels,
        currentChannel: data.channels[0],
      });
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
    socket = io.connect('http://localhost:6969')

    socket.on('new-channel', data => {
      this.setState(state => ({channels: [...state.channels, data]}))
    })
  }

  async componentDidUpdate(prevProps) {
    if (this.props.server !== prevProps.server) {
      await this.fetchChannels();
      await this.fetchUsers();
    }
  }

  setChannel(channel) {
    this.setState({ currentChannel: channel });
  }

  async createChannel(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:6969/api/v1/channel/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.createChannelName,
          serverId: this.props.server.id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data.validationErrors !== null || undefined) {
        this.setState({ errors: data.validationErrors });
      } else {
        this.setState({ errors: [data.message] });
      }
    } else {
      this.setState((state) => ({
        channels: [...state.channels, data.channel],
        creatingChannel: false,
      }));

      socket.emit('new-channel', data.channel)
    }
  }

  toggleCreateChannelForm() {
    this.setState((state) => ({ creatingChannel: !state.creatingChannel }));
  }

  render() {
    return (
      <>
        {this.state.creatingChannel ? (
          <CreateChannelForm
            handleChange={this.handleChange}
            errors={this.state.errors}
            submit={this.createChannel}
          />
        ) : null}
        <ServerTitle serverName={this.props.server.name} />
        <ChannelTitle
          serverId={this.props.server.id}
          channelName={
            this.state.currentChannel ? this.state.currentChannel.name : ""
          }
        />
        <UserTitle username={this.props.username} />
        {this.state.channels ? (
          <ChannelList
            channels={this.state.channels}
            setChannel={this.setChannel}
            toggleCreateForm={this.toggleCreateChannelForm}
          />
        ) : null}
        {this.state.users ? <UserList users={this.state.users} /> : null}
        {this.state.currentChannel ? <Channel channel={this.state.currentChannel}/> : null}
      </>
    );
  }
}
