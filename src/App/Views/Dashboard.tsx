import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

const Main = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function Dashboard() {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const callApi = async () => {
    try {
      const response = await fetch("/api/test", {
        headers: {
          Authorization: `Bearer `
        }
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Main>
      <img alt="User photo" />
      <h2></h2>
      <p></p>
      <button onClick={callApi}>Ping API</button>
    </Main>
  );
}
