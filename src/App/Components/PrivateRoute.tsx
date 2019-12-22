import React, { useEffect, useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

type Rest = {
  [x: string]: any;
};
interface Private {
  component: any;
  path: string;
  rest?: Rest;
}

const PrivateRoute = ({ component: Component, path, ...rest }: Private) => {
  let Auth = useContext(AuthContext);
  let { isAuthenticated } = Auth;

  useEffect(() => {
    if (isAuthenticated()) {
      return;
    }
  }, [isAuthenticated]);

  const render = (props: any) =>
    isAuthenticated() === true ? <Component {...props} /> : <Redirect to="/" />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
