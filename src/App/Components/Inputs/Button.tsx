import * as React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?(): void;
  label?: string;
  children?: any;
  primary?: boolean;
  invert?: boolean;
  disabled?: boolean;
}

const Button: React.SFC<ButtonProps> = ({
  onClick,
  label,
  primary,
  invert,
  children,
  disabled
}) => {
  const IButton = styled.button`
    background: ${primary ? "white" : "#AACCFF"};
    color: ${primary ? "#AACCFF" : "white"};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #AACCFF;
    border-radius: 3px;
    button[disabled]{
      background:red
    }
    &:hover {
      background: ${invert ? "#AACCFF" : ""}
      color: ${invert ? "white" : ""};
      box-shadow: ${!invert ? "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" : ""}
    }
  `;
  return (
    <IButton
      type="button"
      name="button"
      onClick={onClick}
      value={label}
      disabled={disabled}
    >
      {!children ? label : children}
    </IButton>
  );
};
export default Button;
