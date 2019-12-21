import React from "react";
import styled from "styled-components";

interface InputProps {
  value?: string | number;
  onChange?(evt: any): any;
  placeholder?: string;
}

const InputI = styled.input`
  margin: 2rem 0 0 0;
`;

export default function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <div>
      <InputI
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
