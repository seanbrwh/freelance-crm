import React from "react";
import styled from "styled-components";

const Foot = styled.footer`
  position: absolute;
  bottom: inherit;
  width: inherit;
  height: 30rem;
  background: #353736;
`;
const FootGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 70%;
  margin: 0 auto;
`;
const FootSection = styled.section`
  width: 15rem;
  height: 15rem;
  margin: 1rem;
  padding: 1rem;
  font-family: "Open Sans", sans-serif;
  text-transform: capitalize;
  cursor: pointer;

  h2 {
    font-size: 16px;
    margin-bottom: 6px;
    color: white;
  }
  h3 {
    font-size: 14px;
    margin-bottom: 6px;
    color: white;
  }
  p {
    font-size: 12px;
    margin-left: 0.5rem;
    margin-bottom: 6px;
    color: #b1b1b1;
    &:hover {
      color: white;
    }
  }
`;
const Copyright = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: 1rem 0;
  color: white;
  font-size: 12px;
`;

export default function Footer() {
  return (
    <Foot>
      <FootGroup>
        <FootSection>
          <h2>Solution</h2>
          <hr />
          <h3>Product</h3>
          <p>Proposal</p>
          <p>Time Tracking</p>
          <p>Contracts</p>
          <h3>Templates</h3>
          <p>Proposal</p>
          <p>Contracts</p>
          <h3>Pricing</h3>
        </FootSection>
        <FootSection>
          <h2>Resource</h2>
          <hr />
          <h3>Research</h3>
          <p>Freelance Rates</p>
          <p>Best freelance websites</p>
          <h3>Insights</h3>
          <p>Freelance blog</p>
          <h3>Other</h3>
          <p>Freelance tax calculator</p>
          <p>Stripe fee calculator</p>
          <p>PayPal fee calculator</p>
        </FootSection>
        <FootSection>
          <h2>Freelance CRM</h2>
          <hr />
          <h3>Company</h3>
          <p>About us</p>
          <p>Careers</p>
          <h3>Support</h3>
          <p>FAQ</p>
          <p>Email</p>
          <h3>Social</h3>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </FootSection>
      </FootGroup>
      <Copyright>
        <div>&copy; 2019 Sean Bryan White</div>
        <div>
          This is not a law firm, does not provide legal services or advice, and
          does not provide or participate in legal representation.
        </div>
      </Copyright>
    </Foot>
  );
}
