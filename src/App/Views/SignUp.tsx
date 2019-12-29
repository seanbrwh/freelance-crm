import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Input from "../Components/Inputs/Input";
import Button from "../Components/Inputs/Button";
import Card from "../Components/Card";
import { AuthContext } from "../Context/AuthContext";

const Main = styled.section`
  width: inherit;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default function SignUp(props) {
  var [email, setEmail] = useState("");
  var [pswd, setPswd] = useState("");
  var [name, setName] = useState("");
  var [confirmPswd, setConfirmPwsd] = useState("");
  let Auth = useContext(AuthContext);

  let { signup } = Auth;

  useEffect(() => {
    if (props.location.state != undefined) {
      setEmail(props.location.state.email);
    }
  }, [props.location.state]);

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
            value={name}
            onChange={evt => setName(evt.target.value)}
            placeholder="Full name"
            type="text"
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
          <Button label="Create account" onClick={() => signup(email, pswd)} />
          <p>&nbsp;</p>
          <p>Resend verification email</p>
        </Card>
      </Main>
    </>
  );
}
