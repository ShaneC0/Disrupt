import React from "react";
import CreateServerForm from "../components/CreateServerForm";

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
      creatingServer: false,
    };
    this.setServer = this.setServer.bind(this);
    this.toggleServerForm = this.toggleServerForm.bind(this);
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
        {this.state.creatingServer ? <CreateServerForm errors={[]} /> : null}
      </>
    );
  }
}
