import React from "react";

export default class Server extends React.Component {
  /*
        The server component state consists of a servers:
         - Channels
         - Users
         - owner

        The server component houses:
         - Channel Component
         - Channel list
         - User list

        TODO:
         - Load channels and users into state
         - Make one API request to get a channels, users, and owner
         - Style title Components
         - Style list components

    */

  constructor(props) {
    super(props);

    this.state = {
      users: null,
      owner: null,
      channels: [],
    };
  }

  render() {
    return (
      <div className="grid grid-rows-server grid-cols-server">

        <div className="border">
          <h1>Server Name</h1>
        </div>

        <div className="border">
          <h1>Channel Name</h1>
        </div>

        <div className="border">
          <h1>Users Title</h1>
        </div>

        <div className="border">
          <h1>Channel List</h1>
        </div>

        <div className="border">
          <h1>Message List</h1>
        </div>

        <div className="border">
          <h1>User List</h1>
        </div>

        <div className="border">
          <h1>Current User</h1>
        </div>

        <div className="border">
          <h1>Message input box</h1>
        </div>

        <div className="border">
          <h1>Nothing</h1>
        </div>
        
      </div>
    );
  }
}
