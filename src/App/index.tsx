import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import history from "./utils/history";
import App from "./App";
import AuthProvider from "./Context/AuthContext";
import IconLibrary from "./Components/Icons/IconLibrary";
IconLibrary();
ReactDOM.render(
  <AuthProvider>
    <Router history={history}>
      <App />
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);
