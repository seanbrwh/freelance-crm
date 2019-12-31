import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Components/Inputs/Button";
import InputButton from "../Components/Inputs/InputButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

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
  .icons {
    font-size: 5rem;
    color: #aaccff;
    padding: 1rem;
  }
`;

const HeaderText = styled.div`
  width: 30rem;
  height: 10rem;
  padding: 1rem;
  h1 {
    font-size: 2rem;
    color: #aaccff;
    margin: 1rem 0;
  }
`;

const Highlight = styled.span`
  font-weight: bolder;
  color: #aaccff;
`;

const IconSection = styled.div``;

export default function Home() {
  var [signUp, setSignUp] = useState(false);
  var [email, setEmail] = useState("");

  return (
    <>
      <MainSection>
        <SubSection>
          <HeaderText>
            <h1>
              Sweat the <Highlight>project</Highlight> not the details.{" "}
            </h1>
            <p>All-in-one freelance solution.</p>
          </HeaderText>
          <InputButton
            placeHolder="Enter your email"
            buttonLabel="Start Free"
            onClick={() => setSignUp(true)}
            handleValue={evt => setEmail(evt.target.value)}
          />
          {signUp && email && (
            <Redirect to={{ pathname: "/sign-up", state: { email: email } }} />
          )}
        </SubSection>
        <SubSection>
          <img src="" alt="Showing how to explore the features" />
        </SubSection>
      </MainSection>
      <MainSection>
        <SubSection>
          <HeaderText>
            <h1>
              Create proposals, keep track of time, and send out contracts in a
              timely manner
            </h1>
          </HeaderText>
          <IconSection>
            <FontAwesomeIcon icon="envelope-open-text" className="icons" />
            <FontAwesomeIcon icon="user-clock" className="icons" />
            <FontAwesomeIcon icon="credit-card" className="icons" />
            <FontAwesomeIcon icon="chart-bar" className="icons" />
          </IconSection>
        </SubSection>
        <SubSection>
          <Button label="Get started for free" />
        </SubSection>
      </MainSection>
      <MainSection>
        <SubSection>
          <HeaderText>
            <h1>Never worry about the little things again.</h1>
            <p>Try it now and never look back</p>
          </HeaderText>
          <Button label="Start free" />
        </SubSection>
      </MainSection>
    </>
  );
}
