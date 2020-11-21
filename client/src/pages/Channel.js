import React from "react";
import io from "socket.io-client";
import MessageForm from "../components/forms/MessageForm";
import MessageList from "../components/lists/MessageList";

let socket;

export default class Channel extends React.Component {
  //takes channel as props.
  //handles messages

  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
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
      `http://localhost:6969/api/v1/message/channel/${this.props.channel.id}`,
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
      this.setState({ messages: data.messages.reverse() });
    }
  }

  async sendMessage(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:6969/api/v1/message/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: this.state.message,
          channelId: this.props.channel.id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
    } else {
      this.setState((state) => ({
        messages: [...state.messages, data.message],
        message: "",
      }));
    }

    socket.emit('message', data.message)

    //api request to create message
    //push to local state
    //emit message
  }

  async componentDidMount() {
    socket = io.connect("http://localhost:6969");

    socket.on('message', message => {
      if(message.channelId === this.props.channel.id) {
        this.setState(state => ({messages: [...state.messages, message]}))
      }
    })

    await this.fetchMessages();


    //this makes the scroll of the message list default to the bottom
    var messages = document.querySelector("#message-list");
    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
  }

  async componentDidUpdate(prevProps) {
    if (this.props.channel !== prevProps.channel) {
      await this.fetchMessages();
    }
  }

  render() {
    return (
      <>
        <MessageList messages={this.state.messages} />
        <MessageForm
          handleChange={this.handleChange}
          submit={this.sendMessage}
        />
      </>
    );
  }
}
