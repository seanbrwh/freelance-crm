import React from "react";
import styled from "styled-components";

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
          <button>Sign In </button>
          <button>Start free</button>
        </section>
      </Nav>
    </Header>
  );
}
