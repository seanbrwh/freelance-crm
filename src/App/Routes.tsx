import React from "react";
import { Switch, Route } from "react-router";
import Home from "./Views/Home";
import Dashboard from "./Views/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
  </Switch>
);
