import React from "react";
import ReactDOM from "react-dom";
// import { Titlebar, Color } from 'custom-electron-titlebar'

// new Titlebar({
//     backgroundColor: Color.fromHex('#ECECEC')
// });

import App from "./App";
import "./index.css";

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
