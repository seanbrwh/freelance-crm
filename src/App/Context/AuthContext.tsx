import React, { createContext, useState, useEffect } from "react";
import history from "../utils/history";

interface IAuthContext {
  children?: any;
}

export const AuthContext = createContext(null);

const AuthProvider = ({ children }: IAuthContext) => {
  var [authenticated, setAuthenticated] = useState();
  const login = async (email?: string, password?: string) => {
    const request = new Request("/api/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });
    fetch(request)
      .then(res => res.json())
      .then(data => {
        setSession(data);
        history.replace("/dashboard");
      })
      .catch(err => console.error(err));
  };

  const signup = (email?: string, password?: string) => {
    const request = new Request("/api/signupAndVerify", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: new Headers({ "Content-Type": "application/json" })
    });
    fetch(request)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setSession(data);
        history.replace("/dashboard");
      })
      .catch(err => console.error(err));
  };

  const passwordReset = (email?: string) => {};
  const tokenRenewal = () => {};

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("expires_at");
    setAuthenticated(checkAuthentication());
    history.replace("/");
  };

  const setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expires_at * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.token);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("user", JSON.stringify(authResult.user));
    setAuthenticated(checkAuthentication());
  };

  const checkAuthentication = () => {
    var expires = +localStorage.getItem("expires_at");
    return new Date().getTime() < expires;
  };

  const getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("Cannot find access token");
    }
    return accessToken;
  };
  const getUser = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        login: (...p: any | any[]) => login(...p),
        signup: (...p: any[]) => signup(...p),
        logout: () => logout()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
