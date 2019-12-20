import React from "react";
import styled from "styled-components";

interface MobileProps {
  children?: any;
}

export default function Mobile({ ...props }: MobileProps) {
  const Main = styled.main`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
  `;
  const Par = styled.p`
    margin: 2rem;
  `;
  return (
    <Main>
      <Par>Mobile version coming soon</Par>
      <Par>Currently under construction</Par>
    </Main>
  );
}
