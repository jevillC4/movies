import React from "react";

import { Provider } from "react-redux";

import store from "./redux-store";

const Root = ({ children }) => <Provider store={store}>{children}</Provider>;

export default Root;
