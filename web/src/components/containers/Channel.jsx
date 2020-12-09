import React from "react";

import { API_URL } from "../../constants";

import { FiSend } from "react-icons/fi";
import io from "socket.io-client";

let socket;

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
      message: "",
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
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
      this.setState({
        messages: data.messages.sort((a, b) => {
          let c = new Date(a.createDate);
          let d = new Date(b.createDate);
          return c - d;
        }),
      });
    }
  }

  async sendMessage(e) {
    e.preventDefault();

    const response = await fetch(`${API_URL}/message/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: this.state.message,
        channelId: this.props.channel.id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
    } else {
      this.setState((state) => ({
        messages: [...state.messages, data.message],
      }));

      socket.emit("message", data.message);

      document.getElementById("message").value = "";
    }
  }

  async componentDidMount() {
    socket = io.connect("http://localhost:6969");

    socket.on("message", (message) => {
      if (message.channelId === this.props.channel.id) {
        this.setState((state) => ({ messages: [...state.messages, message] }));
      }
    });

    await this.fetchMessages();

    var messages = document.querySelector("#message-list");
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.channel !== this.props.channel) {
      await this.fetchMessages();
    }
  }



  render() {
    return (
      <div className="bg-coolGray-500 col-start-2 col-end-3 row-start-2 row-end-4 grid grid-rows-channel overflow-y-auto">
        <div className="overflow-y-auto" id="message-list">
          {this.state.messages.length > 0
            ? this.state.messages.map((message, i) => (
                <div key={i} className="border-b border-coolGray-600 p-2 mx-2">
                  <p className="text-teal-400">{message.user.username}</p>
                  <p>{message.text}</p>
                </div>
              ))
            : null}
        </div>

        <form
          className="bg-coolGray-700 p-2 flex"
          onSubmit={(e) => this.sendMessage(e)}
        >
          <input
            type="text"
            placeholder="Type a message to start chatting!"
            className="bg-coolGray-500 w-full p-1 rounded-md"
            name="message"
            id="message"
            onChange={(e) => this.handleChange(e)}
          />
        </form>
      </div>
    );
  }
}
