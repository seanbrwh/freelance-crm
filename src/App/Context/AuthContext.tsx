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

  const setSession = (authResult?: any) => {
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

  const validateEmail = (email: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = (password: string) => {
    let errors = {
      length: false,
      special: false,
      number: false
    };
    if (password.length > 6) {
      errors.length = true;
    }
    if (/\W|_/g.test(password)) {
      errors.special = true;
    }
    if (/(\\d)+\\./.test(password)) {
      errors.number = true;
    }

    return errors;
  };

  const validateName = (name: string) => {
    if (/[a-z] [a-z]/gi.test(name)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        validateEmail: (email: string) => validateEmail(email),
        validateName: (name: string) => validateName(name),
        validatePassword: (password: string) => validatePassword(password),
        checkAuthentication: () => checkAuthentication(),
        setSession: (...p: any | any[]) => setSession(...p),
        getAccessToken: () => getAccessToken(),
        getUser: () => getUser(),
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
