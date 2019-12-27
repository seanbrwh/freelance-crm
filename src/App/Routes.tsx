import React from "react";
import { Switch, Route } from "react-router";
import Home from "./Views/Home";
import Dashboard from "./Views/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import SignIn from "./Views/SignIn";
import SignUp from "./Views/SignUp";
import Callback from "./Views/Callback";
import NotFound from "./Views/NotFound";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/sign-in" component={SignIn} />
    <Route path="/sign-up" component={SignUp} />
    <Route path="/callback" component={Callback} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);
