import React from "react"

export default function ChannelTitle(props) {
    //displays channel title from props


    return (
        <div id="channel-title">
            <h3># {props.channelName}</h3>
    <h3>JOIN CODE: {props.serverId}</h3>
        </div>
    )
}