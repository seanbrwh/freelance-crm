import React from "react";
import styled from "styled-components";

interface InputProps {
  value?: string | number;
  onChange?(evt: any): any;
  placeholder?: string;
  type?: string;
}

const InputI = styled.input`
  margin: 2rem 0 0 0;
  min-width: 15rem;
  min-height: 1.6rem;
`;

export default function Input({
  value,
  onChange,
  placeholder,
  type
}: InputProps) {
  return (
    <div>
      <InputI
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
