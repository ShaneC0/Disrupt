import React from 'react';

export default function ChannelList(props) {
    return (
        <div id="channel-list">
            <div className="title">
            <h3>{props.serverName}</h3>
            </div>
            <h5>Channels</h5>
            <p>#General</p>
        </div>
    )
}