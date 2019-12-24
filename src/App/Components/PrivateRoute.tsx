import React, { useState, useContext, useEffect } from "react";
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
  const Auth = useContext(AuthContext);
  let { authenticated, loading } = Auth;

  useEffect(() => {
    console.log(authenticated);
    if (authenticated || loading) {
      return;
    }
  }, [loading, authenticated]);

  const render = (props: any) =>
    authenticated === true ? <Component {...props} /> : <Redirect to="/" />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
