import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dash from "./pages/Dash";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.setUser = this.setUser.bind(this)
  }

  async setUser() {
    const response = await fetch(
      "http://localhost:6969/api/v1/auth/authorize",
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
      this.setState({ user: data.user });
    }
  }

  async componentDidMount() {
    await this.setUser()
  }

  render() {
    return (
      <Router>
        {this.state.user ? (
          <Dash user={this.state.user} />
        ) : (
          <Landing setUser={this.setUser} />
        )}
      </Router>
    );
  }
}
