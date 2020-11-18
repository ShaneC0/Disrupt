import React from "react";

import ServerList from "../components/ServerList";
import ChannelList from "../components/ChannelList";
import UserList from "../components/UserList";
import { Switch } from "react-router-dom";

export default class Dash extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            servers: null
        }
    }

    async fetchServers() {
        const response = await fetch('http://localhost:6969/api/v1/server/member', {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })

        const data = await response.json()

        if(!response.ok) {
            console.error(data)
        } else {
            this.setState({servers: data.servers})
        }
    }

    async componentDidMount() {
        await this.fetchServers()
    }

    render() {
        return (
            <>
            <ServerList servers={this.state.servers}/>
            {/* put switch with other routes inside here */}
            </>
        )
    }
}
