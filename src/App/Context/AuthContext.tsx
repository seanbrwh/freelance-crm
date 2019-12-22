import React, { useState } from "react";
import auth0Js from "auth0-js";
import history from "./../utils/history";
import config from "../../../auth_config.json";
let { domain, clientID, redirectUri } = config;

interface AuthProviderProps {
  children?: any;
}

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth0 = new auth0Js.WebAuth({
    domain: domain,
    clientID: clientID,
    redirectUri: redirectUri,
    responseType: "token id_token",
    scope: "openid profile email",
    audience: "freelance/crm/api"
  });

  const login = (email?: string, password?: string) => {
    auth0.login(
      {
        realm: "Username-Password-Authentication",
        email: email,
        password: password
      },
      (err, authResult) => {
        if (err) {
          console.error(err);
        } else {
          console.log(authResult);
        }
      }
    );
  };

  const signUp = (email?: any, pass?: any) => {
    auth0.signupAndAuthorize(
      {
        connection: "Username-Password-Authentication",
        email: email,
        password: pass
      },
      (err, authResult) => {
        if (err) {
          console.error(err);
        } else {
          setSession(authResult, "/dashboard");
        }
      }
    );
  };

  const passwordReset = (email?: string) => {
    auth0.changePassword(
      {
        connection: "Username-Password-Authentication",
        email: email
      },
      (err, resp) => {}
    );
  };

  const tokenRenewal = (location?: any) => {
    auth0.checkSession({}, (err, authResult) => {
      if (err) {
        console.error(err);
      } else {
        setSession(authResult, location);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
    history.replace("/");
  };

  const handleAuthentication = () => {
    if (typeof window !== "undefined") {
      auth0.parseHash(
        { hash: window.location.hash },
        (err, authResult: any) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            setSession(authResult);
            history.replace("/dashboard");
          } else if (err) {
            history.replace("/sign-in");
            console.log(err);
          }
        }
      );
    }
  };

  const isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };

  const setSession = (authResult: any, location?: any) => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    auth0.client.userInfo(authResult.accessToken, (err, user) => {
      if (err) {
        console.error(err);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        history.replace(location);
      }
    });
  };

  const getUser = () => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
  };

  const getUserName = () => {
    if (getUser()) {
      return getUser().name;
    }
  };

  const getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        login: (...p: any | any[]) => login(...p),
        signUp: (...p: any[]) => signUp(...p),
        passwordReset: () => passwordReset(),
        tokenRenewal: () => tokenRenewal(),
        logout: () => logout(),
        isAuthenticated: () => isAuthenticated(),
        getUser: () => getUser(),
        getUserName: () => getUserName(),
        getAccessToken: () => getAccessToken(),
        handleAuthentication: () => handleAuthentication()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
