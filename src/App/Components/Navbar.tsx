import React from "react";
import styled from "styled-components";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Button from "./Inputs/Button";

const Header = styled.header`
  width: inherit;
  position: fixed;
  top: 0;
`;

const Nav = styled.nav`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Ul = styled.ul`
  display: flex;
`;

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Header>
      <Nav>
        <section>
          <img src="" alt="Brand Logo" />
        </section>
        <Ul>
          <li>Product</li>
          <li>Resources</li>
        </Ul>
        <section>
          {!isAuthenticated && (
            <>
              <Button
                onClick={() => loginWithRedirect({})}
                label="Sign in"
                primary
                invert
              />

              <Button label="Get started" />
            </>
          )}
          {isAuthenticated && (
            <>
              <Button onClick={() => logout()} label="Sign out" />
              <span>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
              </span>
            </>
          )}
        </section>
      </Nav>
    </Header>
  );
}
