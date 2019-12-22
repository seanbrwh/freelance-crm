import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Input from "../Components/Inputs/Input";
import Button from "../Components/Inputs/Button";
import Card from "../Components/Card";

const Main = styled.section`
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default function SignUp() {
  var [email, setEmail] = useState("");
  var [pswd, setPswd] = useState("");
  var [confirmPswd, setConfirmPwsd] = useState("");

  return (
    <>
      <Main>
        <Card title="Sign up">
          <Input
            value={email}
            onChange={evt => setEmail(evt.target.value)}
            placeholder="Email"
            type="email"
          />
          <Input
            value={pswd}
            onChange={evt => setPswd(evt.target.value)}
            placeholder="Password"
            type="password"
          />
          <Input
            value={confirmPswd}
            onChange={evt => setConfirmPwsd(evt.target.value)}
            placeholder="Confirm password"
            type="password"
          />
          <Button label="Create account" />
          <p>&nbsp;</p>
          <p>Resend verification email</p>
        </Card>
      </Main>
    </>
  );
}
