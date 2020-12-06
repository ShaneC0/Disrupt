import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./styles.css";
import App from "./pages/App.jsx";
import Auth from "./pages/Auth.jsx";

/*

   This is the entry point to the app
   Utilizes router to direct to auth or app 
   if token is present.

*/


ReactDOM.render(
  <Router>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/app" component={App} />
      </Switch>
  </Router>,
  document.getElementById("root")
);
