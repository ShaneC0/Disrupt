import React from "react";

import Server from "./Server";

import CreateServerForm from "../components/forms/CreateServerForm";
import JoinServerForm from "../components/forms/JoinServerForm";

import ServerList from "../components/lists/ServerList";

export default class Main extends React.Component {
  //main holds all servers and passes them down to a server component.
  //contains the server selector.
  //takes a user as props
  //handles creating and joining servers and respective forms

  constructor(props) {
    super(props);

    this.state = {
      servers: null,
      currentServer: null,
      creatingServer: false,
      joiningServer: false,
      errors: [],
      createServerName: "",
      joinServerCode: "",
    };

    this.setServer = this.setServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleCreateServerForm = this.toggleCreateServerForm.bind(this);
    this.toggleJoinServerForm = this.toggleJoinServerForm.bind(this);
    this.createServer = this.createServer.bind(this);
    this.joinServer = this.joinServer.bind(this);
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

  toggleCreateServerForm() {
    this.setState((state) => ({
      creatingServer: !state.creatingServer,
      errors: [],
    }));
  }

  async createServer(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:6969/api/v1/server/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.createServerName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.validationErrors !== null || undefined) {
        this.setState({ errors: data.validationErrors });
      } else {
        this.setState({ errors: [data.message] });
      }
    } else {
      this.setState((state) => ({
        servers: [...state.servers, data.server],
        creatingServer: false,
        currentServer: data.server,
      }));
    }
  }

  toggleJoinServerForm() {
    this.setState((state) => ({
      joiningServer: !state.joiningServer,
      errors: [],
    }));
  }

  async joinServer(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:6969/api/v1/server/join/${this.state.joinServerCode}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data.validationErrors !== null || undefined) {
        this.setState({ errors: data.validationErrors });
      } else {
        if (data.message.includes("Not found")) {
          this.setState({ errors: ["Provide a join code"] });
        } else {
          this.setState({ errors: [data.message] });
        }
      }
    } else {
      this.setState((state) => ({
        servers: [...state.servers, data.server],
        joiningServer: false,
        currentServer: data.server,
      }));
    }
  }

  render() {
    return (
      <>
        <ServerList
          servers={this.state.servers}
          currentServer={this.state.currentServer}
          setServer={this.setServer}
          toggleCreateForm={this.toggleCreateServerForm}
          toggleJoinForm={this.toggleJoinServerForm}
        />

        {this.state.creatingServer ? (
          <CreateServerForm
            errors={this.state.errors}
            handleChange={this.handleChange}
            submit={this.createServer}
          />
        ) : null}

        {this.state.joiningServer ? (
          <JoinServerForm
            errors={this.state.errors}
            handleChange={this.handleChange}
            submit={this.joinServer}
          />
        ) : null}

        {this.state.currentServer ? (
          <Server
            server={this.state.currentServer}
            username={this.props.user.username}
          />
        ) : (
          <div id="landing-helper">
            <h1>Hey {this.props.user.username}!</h1>
            <h3>Welcome to Disrupt</h3>
            <p>Create or join a server with the icons on the left to start chatting!</p>
          </div>
        )}
      </>
    );
  }
}
