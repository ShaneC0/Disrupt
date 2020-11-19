import React from "react";
import CreateServerForm from "../components/forms/CreateServerForm";

import ServerList from "../components/lists/ServerList";
import Server from "./Server";

export default class Dash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      servers: null,
      currentServer: null,
      channels: null,
      users: null,
      creatingServer: false,
      createServerName: "",
      joinServerCode: "",
      errors: []
    };
    this.setServer = this.setServer.bind(this);
    this.toggleServerForm = this.toggleServerForm.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.postServer = this.postServer.bind(this)
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

  async fetchServers() {
    const response = await fetch("http://localhost:6969/api/v1/server/member", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
    } else {
      this.setState({ servers: data.servers });
    }
  }

  async fetchUsers(server) {
    const response = await fetch(
      `http://localhost:6969/api/v1/server/users/${server.id}`,
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

  async fetchChannels(server) {
    const response = await fetch(
      `http://localhost:6969/api/v1/channel/server/${server.id}`,
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

  async setServer(server) {
    if (this.state.currentServer != server) {
      await this.fetchUsers(server);
      await this.fetchChannels(server);
      this.setState({ currentServer: server });
    }
  }

  async componentDidMount() {
    await this.fetchServers();
  }

  toggleServerForm() {
    this.setState((state) => ({ creatingServer: !state.creatingServer }));
  }

  async postServer(e) {
    e.preventDefault()
    const response = await fetch("http://localhost:6969/api/v1/server/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        name: this.state.createServerName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
    } else {
      this.setState((state) => ({
        servers: [...state.servers, data.server],
        creatingServer: false,
      }));
    }
  }

  render() {
    return (
      <>
        <ServerList
          servers={this.state.servers}
          setServer={this.setServer}
          toggleServerForm={this.toggleServerForm}
        />
        {this.state.currentServer ? (
          <Server
            server={this.state.currentServer}
            users={this.state.users}
            channels={this.state.channels}
            user={this.props.user}
          />
        ) : null}
        {this.state.creatingServer ? (
          <CreateServerForm errors={[]} handleChange={this.handleChange} postServer={this.postServer}/>
        ) : null}
      </>
    );
  }
}
