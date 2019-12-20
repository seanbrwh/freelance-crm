import React, { Fragment, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import styled from "styled-components";

const Main = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function Dashboard() {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const { loading, user, getTokenSilently } = useAuth0();

  if (loading || !user) {
    return <div>Loading</div>;
  }
  const callApi = async () => {
    try {
      const token = await getTokenSilently();
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
      {/* <code>{JSON.stringify(user, null, 2)}</code> */}
    </Main>
  );
}
