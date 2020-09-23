import React from "react";

import { Layout } from "antd";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import Turn from "../handlers/Turn";
import Result from "../../components/result";
import Movies from "../handlers/Movies";

const { Content } = Layout;

const Body = (props) => {
  let { path } = useRouteMatch();
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <Switch>
        <Route exact path={`${path}/turn`} component={Turn} />
        <Route exact path={`${path}/movies`} component={Movies} />
        <Route exact path={`${path}/dashboard`} component={Result} />
        <Route exact path={`${path}/admin`} component={Result} />
        <Route exact path={`${path}/profile`} component={Result} />
        <Route exact path={`${path}/logout`} component={Result} />
      </Switch>
    </Content>
  );
};

export default Body;
