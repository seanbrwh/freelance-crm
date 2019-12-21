import React from "react";
import styled from "styled-components";

interface CheckboxProps {
  label?: string;
}

const Main = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 2rem 2em;
`;

const ICheckbox = styled.input`
  margin: 0 1rem 0 0;
  vertical-align: middle;
`;

export default function Checkbox({ label }: CheckboxProps) {
  return (
    <Main>
      <ICheckbox type="checkbox" />
      <div>
        <label htmlFor="checkbox">{label}</label>
      </div>
    </Main>
  );
}
