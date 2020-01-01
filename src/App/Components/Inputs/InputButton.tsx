import * as React from "react";
import styled from "styled-components";

interface IInputButton {
  placeHolder?: string;
  buttonLabel: string;
  onClick?(): any;
  handleValue?(evt: any): any;
}

const InputButton: React.FC<IInputButton> = ({
  placeHolder,
  buttonLabel,
  onClick,
  handleValue
}) => {
  var [value, setValue] = React.useState("");
  var [valid, setValid] = React.useState(false);

  React.useEffect(() => {
    setValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  }, [value, valid]);

  return (
    <>
      <SInputButton valid={valid}>
        <input
          type="text"
          placeholder={placeHolder}
          value={value || ""}
          onChange={evt => setValue(evt.target.value)}
          onBlur={handleValue}
        />
        <button onClick={onClick}>{buttonLabel}</button>
      </SInputButton>
    </>
  );
};

let SInputButton = styled.div`
  background-color: #fff;
  position: relative;
  height: 4rem;
  width: 30rem;
  border-radius: 3rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  margin: 1rem 0;
  input[type="text"] {
    background-color: transparent;
    outline: none;
    height: 2rem;
    font-size: 15px;
    border: 0;
    height: inherit;
    width: inherit;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    padding-left: 2rem;
    font-size: 1.2rem;
    color: ${props => (props.valid ? "inherit" : "red")};
  }
  input[type="text"]::-webkit-input-placeholder,
  input[type="text"]::-moz-placeholder,
  input[type="text"]::-moz-placeholder,
  input[type="text"]:-moz-placeholder {
    font-size: 1.2rem;
  }

  button {
    top: 0;
    right: 0;
    position: absolute;
    background: #aaccff;
    border: 0;
    color: #fff;
    height: inherit;
    border-radius: inherit;
    width: 8rem;
    &:hover {
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }
  }
`;

export default InputButton;
