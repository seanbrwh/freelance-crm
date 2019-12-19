import React from "react";
import styled from "styled-components";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

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

const Button = styled.button``;

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
              <button onClick={() => loginWithRedirect({})}>Sign In </button>
              <button>Start free</button>
            </>
          )}
          {isAuthenticated && (
            <>
              <button onClick={() => logout()}>Sign Out</button>
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
