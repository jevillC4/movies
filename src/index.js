import React from "react";
import ReactDOM from "react-dom";
import Moment from "moment";
import * as serviceWorker from "./serviceWorker";

import App from "./App";

import "./index.css";
import "antd/dist/antd.css";

Moment.locale("es");

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


