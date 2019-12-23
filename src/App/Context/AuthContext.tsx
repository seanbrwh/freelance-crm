import React, { createContext, useState } from "react";

interface IAuthContext {
  children?: any;
}

export const AuthContext = createContext(null);

const AuthProvider = ({ children }: IAuthContext) => {
  var [authenticated, setAuthenticated] = useState();
  var [user, setUser] = useState();

  const login = async (email?: string, password?: string) => {
    var results = await fetch("/api/signin", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ email, password }) // body data type must match "Content-Type" header
    });
    setSession(results.json());
  };

  const signup = async (email?: string, password?: string) => {
    var results = await fetch("/api/signup", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, password })
    });
    setSession(results.json());
  };

  const passwordReset = (email?: string) => {};
  const tokenRenewal = () => {};

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("expires_at");
  };

  const setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expires * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.token);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("user", JSON.stringify(authResult.user));
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
        checkAuthentication: () => checkAuthentication(),
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
