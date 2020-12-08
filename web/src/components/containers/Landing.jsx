import React from "react";

export default function Landing({ user }) {
  return (
    <div className="bg-coolGray-700 text-teal-50 flex flex-col items-center justify-center">
      {user ? (
        <>
          <p className="text-8xl">Welcome to Disrupt, {user.username}!</p>
          <p className="text-4xl">
            Create or join a server to start chattting.
          </p>
        </>
      ) : null}
    </div>
  );
}
