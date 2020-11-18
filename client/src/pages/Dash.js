import React from "react";

import ServerList from "../components/ServerList";
import Server from "./Server";

export default class Dash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      servers: null,
      currentServer: null,
      channels: null,
      users: null,
    };
    this.setServer = this.setServer.bind(this);
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

  async setServer(server) {
    if (this.state.currentServer != server) {
      await this.fetchUsers(server);
      this.setState({ currentServer: server });
    }
  }

  async componentDidMount() {
    await this.fetchServers();
  }

  render() {
    return (
      <>
        <ServerList servers={this.state.servers} setServer={this.setServer} />
        {this.state.currentServer ? (
          <Server server={this.state.currentServer} users={this.state.users} />
        ) : null}
      </>
    );
  }
}
