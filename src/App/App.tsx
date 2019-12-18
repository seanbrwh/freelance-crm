import React from "react";
import styled from "styled-components";
import Routes from "./Routes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const Main = styled.main`
  width: 100%;
  background: grey;
`;

export default function App() {
  return (
    <Main>
      <Navbar />
      {Routes}
      <Footer />
    </Main>
  );
}
