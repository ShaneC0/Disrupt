import React from "react";

import Landing from "./pages/Landing";
import Main from "./pages/Main"

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.setUser = this.setUser.bind(this);
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
    await this.setUser();
  }

  render() {
    return (
      <>
        {this.state.user ? (
          <Main user={this.state.user}/>
        ) : (
          <Landing setUser={this.setUser} />
        )}
      </>
    );
  }
}
