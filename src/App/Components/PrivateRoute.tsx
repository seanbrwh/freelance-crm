import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

type Rest = {
  [x: string]: any;
};
interface Private {
  component: any;
  path: string;
  rest?: Rest;
}

const PrivateRoute = ({ component: Component, path, ...rest }: Private) => {
  const { loading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
  }, [loading, isAuthenticated]);

  const render = (props: any) =>
    isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
