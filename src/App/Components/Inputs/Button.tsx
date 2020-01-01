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
const IButton = styled.button`
    background: ${props => (props.primary ? "white" : "#AACCFF")};
    color: ${props => (props.primary ? "#AACCFF" : "white")};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #AACCFF;
    border-radius: 3px;
    button[disabled]{
      background:red
    }
    &:hover {
      background: ${props => (props.invert ? "#AACCFF" : "")}
      color: ${props => (props.invert ? "white" : "")};
      box-shadow: ${props =>
        !props.invert ? "2px 2px 2px 1px rgba(0, 0, 0, 0.2)" : ""}
    }
  `;

const Button: React.SFC<ButtonProps> = ({
  onClick,
  label,
  primary,
  invert,
  children,
  disabled
}) => {
  return (
    <IButton
      primary={primary}
      invert={invert}
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
