import React from "react"

export default function UserTitle(props) {
    //displays the users name from props


    return (
        <div id="user-title" >
            <h3>{props.username}</h3>
        </div>
    )
}