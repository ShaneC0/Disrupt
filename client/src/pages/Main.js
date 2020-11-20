import React from "react";

import ServerList from "../components/lists/ServerList";
import Server from "./Server";

export default class Main extends React.Component {
  //main holds all servers and passes them down to a server component.
  //contains the server selector.
  //takes a user as props

  constructor(props) {
    super(props);

    this.state = {
      servers: null,
      currentServer: null,
    };

    this.setServer = this.setServer.bind(this);
  }

  async fetchServers() {
    const response = await fetch(`http://localhost:6969/api/v1/server/member`, {
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

  setServer(server) {
    this.setState({ currentServer: server });
  }

  async componentDidMount() {
    await this.fetchServers();
  }

  render() {
    return (
      <>
        <ServerList servers={this.state.servers} currentServer={this.state.currentServer} setServer={this.setServer} />
        {this.state.currentServer ? (
          <Server server={this.state.currentServer} />
        ) : (
          <h1>pick a server idiot</h1>
        )}
      </>
    );
  }
}
