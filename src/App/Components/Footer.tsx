import React from "react";
import styled from "styled-components";

const Foot = styled.footer`
  position: absolute;
  bottom: inherit;
  width: inherit;
  height: 30rem;
`;
const FootSection = styled.section``;
const Copyright = styled.div``;

export default function Footer() {
  return (
    <Foot>
      <FootSection>Solution</FootSection>
      <FootSection>Resource</FootSection>
      <FootSection>Company</FootSection>
      <Copyright>&copy; 2019 Sean Bryan White</Copyright>
    </Foot>
  );
}
