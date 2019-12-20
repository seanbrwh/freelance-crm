import React from "react";
import styled from "styled-components";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Button from "./Inputs/Button";
import Dropdown from "./Dropdown";

const Header = styled.header`
  width: inherit;
  position: fixed;
  top: 0;
  background: #fafafa;
`;

const Nav = styled.nav`
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
          <Link to="/">
            <img src="" alt="Brand Logo" />
          </Link>
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
                  <Button>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                </span>
              </>
            )}
          </div>
        </section>
      </Nav>
    </Header>
  );
}
