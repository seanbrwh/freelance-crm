import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Inputs/Input";
import Button from "../Components/Inputs/Button";
import Checkbox from "../Components/Inputs/Checkbox";

const Main = styled.section`
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Form = styled.section`
  height: 50%;
  width: 30%;
  padding: 4rem 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 0.2rem;
  background: rgb(230, 230, 230);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

export default function SignIn() {
  var [email, setEmail] = useState("");
  var [pswd, setPswd] = useState("");
  return (
    <>
      <Main>
        <Form>
          <h1>Log in</h1>
          <div>
            <Input
              value={email}
              onChange={evt => setEmail(evt.target.value)}
              placeholder="Email"
            />
            <Input
              value={pswd}
              onChange={evt => setPswd(evt.target.value)}
              placeholder="Password"
            />
          </div>
          <Checkbox label="Remember me" />
          <Button label="Sign in" />
          <p>Reset password</p>
          <p>Resend verification email</p>
        </Form>
      </Main>
    </>
  );
}
