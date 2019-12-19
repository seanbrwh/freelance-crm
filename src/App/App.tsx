import React from "react";
import styled from "styled-components";
import Routes from "./Routes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useAuth0 } from "./react-auth0-spa";

const Main = styled.main`
  width: 100%;
  height: calc(100vh -3rem);
  margin-top: 3rem;
`;
const AppContainer = styled.div`
  width: 70%;
  height: 100%;
  margin: 0 auto;
`;

export default function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Main>
      <AppContainer>
        <Navbar />
        {Routes}
        <Footer />
      </AppContainer>
    </Main>
  );
}
