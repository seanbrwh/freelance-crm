import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Button from "./Inputs/Button";
import Dropdown from "./Dropdown";
import Freelance from "../Assets/freelancelogo.svg";

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  background: #fafafa;
  z-index: 100;
`;

const Nav = styled.nav`
  height: 5rem;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 12px;
`;

const Ul = styled.ul`
  display: flex;
`;

const Img = styled.img`
  max-height: 3rem;
`;

export default function Navbar() {
  const Auth = useContext(AuthContext);

  let { isAuthenticated, logout } = Auth;

  return (
    <Header>
      <Nav>
        <Container>
          <Link to="/">
            <Img src={Freelance} alt="Brand Logo" />
          </Link>
          <p>Freelance</p>
        </Container>
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
            {!isAuthenticated() ? (
              <>
                <Link to="/sign-in">
                  <Button label="Sign in" primary invert />
                </Link>
                <Link to="/sign-up">
                  <Button label="Sign up" />
                </Link>
              </>
            ) : (
              <>
                <Button label="Sign out" onClick={() => logout()} />
              </>
            )}
          </div>
        </section>
      </Nav>
    </Header>
  );
}
