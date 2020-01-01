import React, { useState } from "react";
import styled from "styled-components";

interface IInput {
  placeholder?: string;
  type?: string;
}

const SInput = styled.input`
  margin: 2rem 0 0 0;
  min-width: 15rem;
  min-height: 1.6rem;
`;

export default function Input({ placeholder, type }: IInput) {
  var [value, setValue] = useState("");
  return (
    <div>
      <SInput
        type={type}
        value={value || ""}
        placeholder={placeholder}
        onChange={evt => setValue(evt.target.value)}
      />
    </div>
  );
}
