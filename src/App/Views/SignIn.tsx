import React from "react";
import styled from "styled-components";

const Main = styled.section`
  width: inherit;
  height: 100vh;
  display: flex;
`;

const SubSection = styled.section`
  height: inherit;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export default function SignIn() {
  return (
    <>
      <Main>
        <SubSection>Sign in</SubSection>
      </Main>
    </>
  );
}
