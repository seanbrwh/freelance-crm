import React from "react";
import { Switch, Route } from "react-router";
import Home from "./Views/Home";
import Dashboard from "./Views/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import SignIn from "./Views/SignIn";
import SignUp from "./Views/SignUp";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />

    <PrivateRoute path="/dashboard" component={Dashboard} />
  </Switch>
);
