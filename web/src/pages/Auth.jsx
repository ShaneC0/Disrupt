import React from "react";

import { API_URL } from "../constants";

import SigninForm from "../components/forms/SigninForm.jsx";
import SignupForm from "../components/forms/SignupForm.jsx";

export default class Auth extends React.Component {
  /*

  This component handles the login and signup forms
  Uses a grid defined in tailwind config for the layout
  Owns two  child components for signup and signin forms
  active form is stored in state and toggle with a button in the form.

  TODO: 
      - Error rings on inputs
      - error handling

  */

  constructor(props) {
    super(props);

    this.state = {
      authMethod: "signup",
      username: "",
      password: "",
      confirmPassword: "",
      errors: [],
    };

    this.handleChange = this.handleChange.bind(this);
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

  async postCredentials(e) {
    /*
        TODO: 
         - Handle errors
    */
    e.preventDefault();

    if (
      this.state.authMethod === "signup" &&
      this.state.password !== this.state.confirmPassword
    ) {
      this.setState({ errors: ["Passwords don't match"] });
    } else {
      const response = await fetch(`${API_URL}/auth/${this.state.authMethod}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.validationErrors !== null || undefined) {
          this.setState({ errors: data.validationErrors });
        } else {
          this.setState({ errors: [data.message] });
        }
        console.log(this.state.errors);
      } else {
        localStorage.token = data.token;
        this.props.history.push("/app");
      }
    }
  }

  render() {
    return (
      <div className="bg-coolGray-800 h-screen w-screen grid grid-cols-auth grid-rows-auth">
        {this.state.authMethod === "signup" ? (
          <SignupForm
            switchAuth={() =>
              this.setState({ authMethod: "signin", errors: [] })
            }
            handleChange={(e) => this.handleChange(e)}
            submit={(e) => this.postCredentials(e)}
            errors={this.state.errors}
          />
        ) : (
          <SigninForm
            switchAuth={() =>
              this.setState({ authMethod: "signup", errors: [] })
            }
            handleChange={(e) => this.handleChange(e)}
            submit={(e) => this.postCredentials(e)}
            errors={this.state.errors}
          />
        )}
      </div>
    );
  }
}
