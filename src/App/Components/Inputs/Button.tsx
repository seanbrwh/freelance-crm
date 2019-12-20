import * as React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?(): void;
  label: string;
  children?: any;
  primary?: boolean;
  invert?: boolean;
}

const Button: React.SFC<ButtonProps> = ({
  onClick,
  label,
  primary,
  invert
}) => {
  const IButton = styled.input`
    background: ${primary ? "white" : "#00B98F"};
    color: ${primary ? "#00B98F" : "white"};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #00b98f;
    border-radius: 3px;

    &:hover {
      background: ${invert ? "#00B98F" : ""}
      color: ${invert ? "white" : ""};
      box-shadow: ${!invert ? "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" : ""}
  `;
  return (
    <IButton
      type="button"
      name="button"
      onClick={onClick}
      value={label}
    ></IButton>
  );
};
export default Button;
