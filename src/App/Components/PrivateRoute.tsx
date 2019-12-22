import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

type Rest = {
  [x: string]: any;
};
interface Private {
  component: any;
  path: string;
  rest?: Rest;
}

const PrivateRoute = ({ component: Component, path, ...rest }: Private) => {
  const [authenticated] = useState(true);
  const render = (props: any) =>
    authenticated === true ? <Component {...props} /> : <Redirect to="/" />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
