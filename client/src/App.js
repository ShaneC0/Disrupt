import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import ServerList from "./components/ServerList"
import ChannelList from "./components/ChannelList"
import UserList from "./components/UserList"

import Landing from "./pages/Landing";
import Dump from "./pages/Dump";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <ServerList />
        <ChannelList />
        <UserList />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/dump" component={Dump} />
        </Switch>
      </Router>
    );
  }
}
