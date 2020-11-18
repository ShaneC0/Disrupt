import React from "react";

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
      errors: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.switchAuthMethod = this.switchAuthMethod.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      this.state.password !== this.state.confirmPassword &&
      this.state.authMethod === "signup"
    ) {
      this.setState({ errors: ["Passwords do not match"] });
    } else {
      const response = await fetch(
        `http://localhost:6969/api/v1/auth/${this.state.authMethod}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
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
        localStorage.token = data.token
        this.props.history.push('/dump')
      }
    }
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

  switchAuthMethod() {
    this.setState(state => ({
      authMethod: state.authMethod === 'signup' ? 'signin' : 'signup'
    }))
  }

  render() {
    return (
      <div id="landing">
        {this.state.authMethod === "signup" ? (
          <SignupForm
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            errors={this.state.errors}
            switchAuth={this.switchAuthMethod}
          />
        ) : (
          <SigninForm
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            errors={this.state.errors}
            switchAuth={this.switchAuthMethod}
          />
        )}
      </div>
    );
  }
}
