import React, { createContext, useState } from "react";

var Auth = createContext(null);

export default function AuthContext({ children }) {
  var [authenticated, setAuthenticated] = useState();
  var [user, setUser] = useState();

  var login = async (email, password) => {
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
    return await results.json();
  };

  var signup = async (email, password) => {
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
    return await results.json();
  };

  var setSession = authResult => {
    localStorage.setItem("access_token", authResult.token);
    localStorage.setItem("user", authResult.user);
    localStorage.setItem("expires_at", authResult.expires_at);
  };

  var checkAuthentication = () => {
    var expires = localStorage.getItem("expires_at");
    return new Date().getTime() < expires;
  };

  return (
    <Auth.Provider
      value={{
        checkAuthentication: () => checkAuthentication(),
        login: (...p: any[]) => login(...p),
        signup: (...p: any[]) => signup(...p)
      }}
    >
      {children}
    </Auth.Provider>
  );
}
