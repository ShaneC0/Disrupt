import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav"
import Landing from "./pages/Landing"

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/" component={Landing}/>
        </Switch>
      </Router>
    );
  }
}
