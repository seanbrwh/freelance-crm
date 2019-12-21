import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import history from "./utils/history";
import App from "./App";

ReactDOM.render(
  <AuthProvider>
    <Router history={history}>
      <App />
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);
