import React from "react";

import { API_URL } from "../../constants";

export default class Channel extends React.Component {
  /*
    The channel component is housed inside of the server component
    it takes a channel as props

    on mount, it requests the messages for the channel and populates the state
    */

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  async fetchMessages() {
    const response = await fetch(
      `${API_URL}/message/channel/${this.props.channel.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
    } else {
      this.setState({ messages: data.messages });
      console.log(this.state);
    }
  }

  async componentDidMount() {
    await this.fetchMessages();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.channel !== this.props.channel) {
      await this.fetchMessages();
    }
  }

  render() {
    return (
      <div className="bg-coolGray-500 col-start-2 col-end-3 row-start-2 row-end-4 grid grid-rows-channel">
        <div>
          {this.state.messages.length > 0
            ? this.state.messages.map((message) => (

                <div className="border-b border-coolGray-600 p-2 mx-2">
                  <p className="text-teal-400">{message.user.username}</p>
                  <p>{message.text}</p>
                </div>

              ))
            : null}
        </div>

        <div className="bg-coolGray-700 p-2">
          <input
            type="text"
            placeholder="Type a message to start chatting!"
            className="bg-coolGray-500 w-full p-1 rounded-md"
            name="message"
          />
        </div>
      </div>
    );
  }
}
