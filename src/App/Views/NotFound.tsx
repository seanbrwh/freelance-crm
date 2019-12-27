import React from "react";
import styled from "styled-components";

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
`;

export default function NotFound() {
  return (
    <Main>
      <div>Currently under construction</div>
    </Main>
  );
}
