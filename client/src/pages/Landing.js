import React, { useState } from "react";

import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authMethod: "signup",
      username: "",
      password: "",
      confirmPassword: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();


    //MAKE SURE TO CHECK CONFIRM PASSWORD


    const response = await fetch(`http://localhost:6969/api/v1/auth/${this.state.authMethod}`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })

    const data = await response.json()

    console.log(data)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div id="landing">
        <div className="text-group">
          <h1>Disrupt</h1>
          <div className="btn-group">
            {this.state.authMethod === "signup" ? (
              <button onClick={() => this.setState({ authMethod: "signin" })}>
                Sign in
              </button>
            ) : (
              <button onClick={() => this.setState({ authMethod: "signup" })}>
                Create account
              </button>
            )}
          </div>
        </div>

        {this.state.authMethod === "signup" ? (
          <SignupForm
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        ) : (
          <SigninForm
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}
