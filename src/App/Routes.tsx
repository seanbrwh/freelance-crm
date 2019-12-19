import React from "react";
import { Switch, Route } from "react-router";
import Home from "./Views/Home";
import Dashboard from "./Views/Dashboard";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);
