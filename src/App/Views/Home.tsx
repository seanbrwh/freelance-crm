import React from "react";
import styled from "styled-components";

const MainSection = styled.section`
  width: inherit;
  height: 100vh;
  display: flex;
`;

const SubSection = styled.section`
  height: inherit;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export default function Home() {
  return (
    <div>
      <MainSection>
        <SubSection>Call To action</SubSection>
        <SubSection>Feature explore</SubSection>
      </MainSection>
      <MainSection>
        <SubSection>Feature explain</SubSection>
        <SubSection>Call to action</SubSection>
      </MainSection>
      <MainSection>
        <SubSection>Product explaination</SubSection>
        <SubSection>Call to action</SubSection>
      </MainSection>
      <MainSection>
        <SubSection>Area coverage</SubSection>
        <SubSection>Call to action</SubSection>
      </MainSection>
    </div>
  );
}
