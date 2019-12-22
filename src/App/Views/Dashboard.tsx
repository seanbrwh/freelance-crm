import React, { Fragment, useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import styled from "styled-components";

const Main = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function Dashboard() {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    var tempUser = localStorage.getItem("user");
    setUser(tempUser);
  }, []);
  let Auth = useContext(AuthContext);

  let { getAccessToken } = Auth;

  if (!user) {
    return <div>Loading</div>;
  }
  const callApi = async () => {
    try {
      const token = await getAccessToken();
      const response = await fetch("/api/test", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();
      console.log(JSON.stringify(responseData));
      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Main>
      <img src={user.picture} alt="User photo" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={callApi}>Ping API</button>
      {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}

      <code>{JSON.stringify(user, null, 2)}</code>
    </Main>
  );
}
