import React from "react";


export default function SignupForm(props) {
    return (
        <form>
            <h2>Sign in</h2>

            <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Username"/>
            </div>

            <div className="form-group">
            <label>Password</label>
            <input type="text" placeholder="Password"/>
            </div>

            <button>Submit</button>
        </form>
    )
}