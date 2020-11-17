import React from "react";

import Sidebar from "./Sidebar";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarIsShowing: false,
    };
  }

  render() {
    return (
      <>
        <header>
          <h1>
            <i
              onClick={() =>
                this.setState((state) => ({
                  sidebarIsShowing: !state.sidebarIsShowing,
                }))
              }
              className="fas fa-bars"
            ></i>
          </h1>
          <h1>Disrupt</h1>
        </header>
        {this.state.sidebarIsShowing ? <Sidebar /> : null}
      </>
    );
  }
}
