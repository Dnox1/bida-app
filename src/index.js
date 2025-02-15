import React from "react";
import ReactDOM from "react-dom";
// import {vertion, Button } from "antd";
import "antd/dist/antd.css"
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { AuthStore } from "./contexts/AuthStore";
// import { UserContextProvider } from "./contexts/UserContext"

ReactDOM.render(
  <Router>
    <AuthStore>
      {/* <UserContextProvider> */}
        <App />
      {/* </UserContextProvider> */}
    </AuthStore>
  </Router>,
  document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
