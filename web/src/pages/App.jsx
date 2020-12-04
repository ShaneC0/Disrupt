import React from "react";

import ServerList from "../components/lists/ServerList.jsx"
import ChannelList from "../components/lists/ChannelList.jsx"
import UserList from "../components/lists/UserList.jsx"
import MessageList from "../components/lists/MessageList.jsx";

export default class App extends React.Component {

  /*

    This component is the main dashboard for the app.
    Utilizes a grid defined in tailwind config for layout

  */


  render() {
    return (
      <div className="bg-warmGray-300 h-screen w-screen grid grid-cols-app grid-rows-app">

        <div className="row-span-1 col-span-5 bg-coolGray-900 border"></div>

        <ServerList />

        <ChannelList />
        
        <MessageList />

        <UserList />

      </div>
    );
  }
}
