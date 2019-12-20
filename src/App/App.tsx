import React from "react";
import styled from "styled-components";
import Routes from "./Routes";
import Mobile from "./Components/Mobile";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useAuth0 } from "./react-auth0-spa";

const Main = styled.main`
  width: 100%;
  height: calc(300vh -3rem);
  margin-top: 3rem;
`;
const AppContainer = styled.div`
  width: 70%;
  height: inherit;
  margin: 0 auto;
`;

export default function App() {
  var [deviceWidth, setDeviceWidth] = React.useState();
  const { loading } = useAuth0();

  React.useEffect(() => {
    deviceWidth = window.innerWidth;
    setDeviceWidth(deviceWidth);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Main>
      {deviceWidth < 1000 ? (
        <Mobile />
      ) : (
        <AppContainer>
          <Navbar />
          {Routes}
          <Footer />
        </AppContainer>
      )}
    </Main>
  );
}
