import React, { useState, useContext } from "react";
import styled from "styled-components";
import Input from "../Components/Inputs/Input";
import Button from "../Components/Inputs/Button";
import Checkbox from "../Components/Inputs/Checkbox";
import Card from "../Components/Card";

const Main = styled.section`
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default function SignIn() {
  var [email, setEmail] = useState("");
  var [pswd, setPswd] = useState("");

  return (
    <>
      <Main>
        <Card title="Log in">
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
          <Button label="sign in" />
          <Checkbox label="Remember me" />
          <p>Reset password</p>
          <p>&nbsp;</p>
          <p>Resend verification email</p>
        </Card>
      </Main>
    </>
  );
}
