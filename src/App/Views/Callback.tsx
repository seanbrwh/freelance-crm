import React, { useContext, useEffect } from "react";
import Loading from "../Components/Loading";
import { AuthContext } from "../Context/AuthContext";

export default function Callback() {
  let Auth = useContext(AuthContext);
  let { handleAuthentication } = Auth;

  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication()]);
  return (
    <div>
      <Loading />
    </div>
  );
}
