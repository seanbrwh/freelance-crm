import React from "react";
import styled from "styled-components";
import Input from "../Components/Inputs/Input";
import Button from "../Components/Inputs/Button";
import InputButton from "../Components/Inputs/InputButton";

const MainSection = styled.section`
  width: 100%;
  height: 90vh;
  margin: 3rem 0;
  display: flex;
`;

const SubSection = styled.section`
  height: inherit;
  width: 100%;
  margin: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const HeaderText = styled.div`
  width: 30rem;
  height: 10rem;
  padding: 1rem;
  h1 {
    font-size: 2rem;
    color: #aaccff;
    font-weight: 800;
    margin: 1rem 0;
  }
`;

export default function Home() {
  return (
    <>
      <MainSection>
        <SubSection>
          <HeaderText>
            <h1>Sweat over the project not the details. </h1>
            <p>All-in-one freelance solution.</p>
          </HeaderText>
          <InputButton inputLabel="Enter your email" buttonLabel="Start Free" />
        </SubSection>
        <SubSection>
          <img src="" alt="Showing how to explore the features" />
        </SubSection>
      </MainSection>
      <MainSection>
        <SubSection>
          Create proposals, keep track of time, and send out contracts in a
          timely manner
        </SubSection>
        <SubSection>
          <Button label="Get started for free" />
        </SubSection>
      </MainSection>
      <MainSection>
        <SubSection>
          <Button label="Start free" />
        </SubSection>
        <SubSection>Never worry about the little things again. </SubSection>
      </MainSection>
    </>
  );
}
