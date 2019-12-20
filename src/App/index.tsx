import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Auth0Provider } from "./react-auth0-spa";
import history from "./utils/history";
import App from "./App";

ReactDOM.render(
  <Auth0Provider>
    <Router history={history}>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);
