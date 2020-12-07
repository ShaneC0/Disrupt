import React from "react";

import { API_URL } from "../constants";

import ServerList from "../components/lists/ServerList.jsx";
import ChannelList from "../components/lists/ChannelList.jsx";
import UserList from "../components/lists/UserList.jsx";
import Server from "../components/containers/Server.jsx";
import Landing from "../components/containers/Landing.jsx";

export default class App extends React.Component {
  /*

    This component is the main dashboard for the app.
    Utilizes a grid defined in tailwind config for layout

    App state consists of the current user and the servers they
    a member of

    On mount makes a request to backend for user and servers

    houses the server component

    TODO: 
     - Hold a current server and pass it to the server component
     - Have some sort of placeholder when a server isn't selecteds

  */

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      servers: null,
      currentServer: null,
    };
  }

  async componentDidMount() {
    const response = await fetch(`${API_URL}/auth/authorize`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    const data = await response.json();

    this.setState({
      user: data.user,
      servers: data.servers,
      currentServer: data.servers[0],
    });
  }

  render() {
    return (
      <div className="bg-warmGray-300 h-screen w-screen grid grid-cols-app grid-rows-app">
        {/* Top bar */}
        <div className="row-span-1 col-span-5 bg-coolGray-900"></div>

        {/* component displays the loaded servers */}
        <ServerList
          servers={this.state.servers}
          logout={() => {
            delete localStorage.token;
            this.props.history.push("/auth");
          }}
        />

        {this.state.currentServer ? (
          <Server server={this.state.currentServer} user={this.state.user} />
        ) : (
          <Landing />
        )}
      </div>
    );
  }
}
