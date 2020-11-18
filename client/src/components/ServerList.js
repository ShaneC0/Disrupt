import React from "react";

export default class ServerList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="server-list">
        {this.props.servers
          ? this.props.servers.map((server, i) => <button key={i}>{server.name.charAt(0)}</button>)
          : null}
        <button>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  }
}
