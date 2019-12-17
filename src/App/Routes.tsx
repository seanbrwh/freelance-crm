import React from "react";
import { Switch, Route } from "react-router";
import Home from "./Views/Home";

export default (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);
