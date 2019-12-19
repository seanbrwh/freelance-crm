import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Auth0Provider } from "./react-auth0-spa";
import config from "../../auth_config.json";
import history from "./utils/history";
import App from "./App";

const onRedirectCallback = (appState?: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirectUri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}
  >
    <Router history={history}>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById("root")
);
