import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "../react-auth0-spa";
import { Link, Redirect } from "react-router-dom";
import Button from "./Inputs/Button";
import Dropdown from "./Dropdown";
import Modal from "../Components/Modal";
import Freelance from "../Assets/freelancelogo.svg";

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
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
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
              items={["Propsals", "Time tracking", "Contracts"]}
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
              <input type="text" value="UserName" />
            </Modal>
          </div>
        </section>
      </Nav>
    </Header>
  );
}
