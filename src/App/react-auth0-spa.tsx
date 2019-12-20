import * as React from "react";
import auth0Js from "auth0-js";
import history from "./utils/history";
let { DOMAIN, CLIENT_ID, AUTH_CALLBACK } = process.env;

const { useState, createContext, useContext } = React;
interface Auth0Props {
  children: any;
  onRedirectCallback: any;
  domain: any;
  client_id: any;
  redirectUri: any;
  audience: any;
}

export const Auth0Context = React.createContext(null);
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({ children, ...initOptions }: Auth0Props) => {
  const auth0 = new auth0Js.WebAuth({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    redirectUri: AUTH_CALLBACK,
    responseType: "token id_token",
    scope: "openid profile email"
  });
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  const googleLogin = () => {
    auth0.authorize({ connection: "google" }, (err, authResult) => {});
  };

  const facebookLogin = () => {
    auth0.authorize({ connection: "facebook" }, (err, authResult) => {});
  };

  const githubLogin = () => {
    auth0.authorize({ connection: "github" }, (err, authResult) => {});
  };

  const linkedinLogin = () => {
    auth0.authorize({ connection: "linkedin" }, (err, authResult) => {});
  };

  const traditionalLogin = (email, username, password) => {
    auth0.login(
      { realm: "test", email: "", username: "", password: "" },
      err => {}
    );
  };
  const passwordlessStart = email => {
    auth0.passwordlessStart(
      {
        connection: "email",
        send: "code",
        email: email
      },
      (err, res) => {}
    );
  };

  const passwordlessLogin = email => {
    auth0.passwordlessLogin(
      {
        connection: "email",
        email: email,
        verificationCode: ""
      },
      (err, res) => {}
    );
  };

  const signUp = (email, pass) => {
    auth0.signup(
      {
        connection: "Username-Password-Authentication",
        email: email,
        password: pass
      },
      err => {}
    );
  };

  const passwordReset = () => {
    auth0.changePassword(
      {
        connection: "",
        email: ""
      },
      (err, resp) => {}
    );
  };
  const tokenRenewal = () => {
    auth0.checkSession({}, (err, authResult) => {});
  };

  const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");

    history.replace("/");
  };

  const handleAuthentication = () => {
    if (typeof window !== "undefined") {
      auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
          history.replace("/");
        } else if (err) {
          history.replace("/");
          console.log(err);
        }
      });
    }
  };

  const isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };

  const setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    auth0.client.userInfo(authResult.accessToken, (err, user) => {
      localStorage.setItem("user", JSON.stringify(user));
      history.replace("/");
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

  return <Auth0Context.Provider value={{}}>{children}</Auth0Context.Provider>;
};

// const DEFAULT_REDIRECT_CALLBACK = () =>
//   window.history.replaceState({}, document.title, window.location.pathname);

// export const Auth0Context = React.createContext(null);
// export const useAuth0 = () => useContext(Auth0Context);
// export const Auth0Provider = ({
//   children,
//   onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
//   ...initOptions
// }: AUTH0PROVIDER) => {
//   const [isAuthenticated, setIsAuthenticated] = useState();
//   const [user, setUser] = useState();
//   const [auth0Client, setAuth0] = useState();
//   const [loading, setLoading] = useState(true);
//   const [popupOpen, setPopupOpen] = useState(false);

//   useEffect(() => {
//     const initAuth0 = async () => {
//       const auth0FromHook = await createAuth0Client(initOptions);
//       setAuth0(auth0FromHook);

//       if (window.location.search.includes("code=")) {
//         const { appState } = await auth0FromHook.handleRedirectCallback();
//         onRedirectCallback(appState);
//       }

//       const isAuthenticated = await auth0FromHook.isAuthenticated();

//       setIsAuthenticated(isAuthenticated);

//       if (isAuthenticated) {
//         const user = await auth0FromHook.getUser();
//         setUser(user);
//       }

//       setLoading(false);
//     };
//     initAuth0();
//     // eslint-disable-next-line
//   }, []);

//   const loginWithPopup = async (params = {}) => {
//     setPopupOpen(true);
//     try {
//       await auth0Client.loginWithPopup(params);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setPopupOpen(false);
//     }
//     const user = await auth0Client.getUser();
//     setUser(user);
//     setIsAuthenticated(true);
//   };

//   const handleRedirectCallback = async () => {
//     setLoading(true);
//     await auth0Client.handleRedirectCallback();
//     const user = await auth0Client.getUser();
//     setLoading(false);
//     setIsAuthenticated(true);
//     setUser(user);
//   };
//   return (
//     <Auth0Context.Provider
//       value={{
//         isAuthenticated,
//         user,
//         loading,
//         popupOpen,
//         loginWithPopup,
//         handleRedirectCallback,
//         getIdTokenClaims: (...p: any[]) => auth0Client.getIdTokenClaims(...p),
//         loginWithRedirect: (...p: any[]) => auth0Client.loginWithRedirect(...p),
//         getTokenSilently: (...p: any[]) => auth0Client.getTokenSilently(...p),
//         getTokenWithPopup: (...p: any[]) => auth0Client.getTokenWithPopup(...p),
//         logout: (...p: any[]) => auth0Client.logout(...p)
//       }}
//     >
//       {children}
//     </Auth0Context.Provider>
//   );
// };
