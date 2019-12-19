import React, { useEffect } from "react";
import { Route } from "react-router-dom";
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
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = (props: any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
