import React from "react";
import styled from "styled-components";

const IButton = styled.input``;
const Label = styled.label``;

export default function Button({ handleClick, label }) {
  return (
    <>
      <Label htmlFor="button">{label}</Label>
      <IButton type="button" name="button" onClick={handleClick}></IButton>
    </>
  );
}
