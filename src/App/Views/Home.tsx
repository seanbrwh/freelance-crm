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
    <>
      <MainSection>
        <SubSection>
          Sweat the project not the details. All-in-one freelance solution.
        </SubSection>
        <SubSection>Feature explore</SubSection>
      </MainSection>
      <MainSection>
        <SubSection>
          Create proposals, keep track of time, and send out contracts in a
          timely manner
        </SubSection>
        <SubSection>Call to action</SubSection>
      </MainSection>
      <MainSection>
        <SubSection>Never worry about the little things again. </SubSection>
        <SubSection>Call to action</SubSection>
      </MainSection>
    </>
  );
}
