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
    console.log(props.location.state);
    if (props.location.state != undefined) {
      setEmail(props.location.state.email);
    }
  }, [props.location.state]);

  return (
    <>
      <Main>
        <Card title="Sign up">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Full name" type="text" />
          <Input placeholder="Password" type="password" />
          <Input placeholder="Confirm password" type="password" />
          <Button label="Create account" onClick={() => signup(email, pswd)} />
          <p>&nbsp;</p>
          <p>Resend verification email</p>
        </Card>
      </Main>
    </>
  );
}
