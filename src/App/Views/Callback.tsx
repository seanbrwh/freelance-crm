import React, { useContext, useEffect } from "react";
import Loading from "../Components/Loading";
import { AuthContext } from "../Context/AuthContext";
import history from "../utils/history";

export default function Callback(props: any) {
  var Auth = useContext(AuthContext);
  let { checkAuthentication, setSession } = Auth;
  useEffect(() => {
    var init = () => {
      let nonce = props.location.search
        .split(/\?|&/)
        .filter((e: any) => e)[2]
        .replace(/user=/g, "");
      nonce = decodeURIComponent(nonce);
      const request = new Request("/api/user/verifynonce", {
        method: "POST",
        body: JSON.stringify({ nonce }),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
      fetch(request)
        .then(res => res.json())
        .then(data => {
          setSession(data);
          checkAuthentication();
          history.replace("/dashboard");
        });
    };
    init();
  }, [props.location.search]);

  return (
    <div>
      <Loading />
    </div>
  );
}
