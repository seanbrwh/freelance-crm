import auth0js from "auth0-js";
import history from "./utils/history";

let { DOMAIN, CLIENT_ID, AUTH_CALLBACK } = process.env;

const isBrowser = typeof window !== "undefined";

export default class Auth {
  auth0 = new auth0js.WebAuth({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    redirectUri: AUTH_CALLBACK,
    responseType: "token id_token",
    scope: "openid profile email"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  googleLogin() {
    this.auth0.authorize(
      {
        connection: "google"
      },
      (err, authResult) => {}
    );
  }
  facebookLogin() {
    this.auth0.authorize(
      {
        connection: "facebook"
      },
      (err, authResult) => {}
    );
  }
  githubLogin() {
    this.auth0.authorize(
      {
        connection: "github"
      },
      (err, authResult) => {}
    );
  }
  linkedInLogin() {
    this.auth0.authorize(
      {
        connection: "linkedin"
      },
      (err, authResult) => {}
    );
  }

  login() {
    this.auth0.login(
      {
        realm: "test",
        email: "",
        username: "",
        password: ""
      },
      err => {}
    );
  }
  passwordlessStart(email) {
    this.auth0.passwordlessStart(
      {
        connection: "email",
        send: "code",
        email: email
      },
      (err, res) => {}
    );
  }
  passwordlessLogin(email) {
    this.auth0.passwordlessLogin(
      {
        connection: "email",
        email: email,
        verificationCode: ""
      },
      (err, res) => {}
    );
  }

  signUp(email, pass) {
    this.auth0.signup(
      {
        connection: "Username-Password-Authentication",
        email: email,
        password: pass
      },
      err => {}
    );
  }

  passwordReset() {
    this.auth0.changePassword(
      {
        connection: "",
        email: ""
      },
      (err, resp) => {}
    );
  }
  tokenRenewal() {
    this.auth0.checkSession({}, (err, authResult) => {});
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");

    history.replace("/");
  }

  handleAuthentication() {
    if (typeof window !== "undefined") {
      this.auth0.parseHash(
        { hash: window.location.hash },
        (err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            history.replace("/");
          } else if (err) {
            history.replace("/");
            console.log(err);
          }
        }
      );
    }
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      localStorage.setItem("user", JSON.stringify(user));
      history.replace("/");
    });
  }

  getUser() {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
  }

  getUserName() {
    if (this.getUser()) {
      return this.getUser().name;
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }
}
