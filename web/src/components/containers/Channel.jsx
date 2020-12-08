import React from "react";

export default class Channel extends React.Component {
  /*
    The channel component is housed inside of the server component
    it takes a channel as props

    on mount, it requests the messages for the channel and populates the state

    Maybe use grid or maybe just use flex with height? 
    probably grid just to be consistent.
    */

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  render() {
    return (
      <div className="bg-coolGray-500 col-start-2 col-end-3 row-start-2 row-end-4">
        <div>Message list</div>
        <div>Message input</div>
      </div>
    );
  }
}
