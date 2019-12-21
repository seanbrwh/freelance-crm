import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import Button from "./Inputs/Button";
import Dropdown from "./Dropdown";
import Modal from "../Components/Modal";
import Freelance from "../Assets/freelancelogo.svg";
import { AuthContext } from "../Context/AuthContext";

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  background: #fafafa;
`;

const Nav = styled.nav`
  height: 5rem;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const Ul = styled.ul`
  display: flex;
`;

const Img = styled.img`
  max-height: 3rem;
`;

export default function Navbar() {
  var [signInModal, setSignInModal] = useState(false);
  var [userName, setUserName] = useState();
  var [email, setEmail] = useState();
  var [password, setPassword] = useState();
  var Auth = useContext(AuthContext);

  return (
    <Header>
      <Nav>
        <section>
          <Img src={Freelance} alt="Brand Logo" />
        </section>
        <section
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <div>
            <Dropdown
              label="products"
              items={["Proposals", "Time tracking", "Contracts"]}
            />
            <Dropdown
              label="Resources"
              items={["Freelance rates", "Freelance resources"]}
            />
          </div>
          <div>
            <Button
              label="Sign in"
              primary
              invert
              onClick={() => setSignInModal(true)}
            />
            <Modal handleClose={() => setSignInModal(false)} show={signInModal}>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={evt =>
                  function() {
                    evt.stopPropagation();
                    setUserName(evt.target.value);
                  }
                }
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={evt =>
                  function() {
                    evt.stopPropagation();
                    setEmail(evt.target.value);
                  }
                }
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={evt =>
                  function() {
                    evt.stopPropagation();
                    setPassword(evt.target.value);
                  }
                }
                onBlur={evt =>
                  function() {
                    evt.stopPropagation();
                    setPassword(evt.target.value);
                  }
                }
              />

              <Button
                label="Sign in"
                onClick={() => Auth.traditionalLogin(email, userName, password)}
              />
            </Modal>
          </div>
        </section>
      </Nav>
    </Header>
  );
}
