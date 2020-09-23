import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Root from "./Root";
import Layout from "./containers/layout";

import "./App.css";

const App = () => (
  <Root>
    <Router>
      <Switch>
        <Route path="/app" component={Layout} />
      </Switch>
    </Router>
  </Root>
  // <Provider store={store}>
  //   <Router>
  //     <Switch>
  //       <Route path="/app" component={Layout} />
  //     </Switch>
  //   </Router>
  // </Provider>
);

export default App;
