import React from "react";
import styled from "styled-components";

interface ModalProps {
  handleClose(): void;
  show: boolean;
  children?: any;
}

export default function Modal({ handleClose, show, children }: ModalProps) {
  const ModalC = styled.div`
    display: ${show ? "block" : "none"};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  `;
  const ModalMain = styled.div`
    position: fixed;
    background: #acacac;
    width: 40%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
  const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  `;

  return (
    <ModalC>
      <ModalMain>
        <button onClick={handleClose}>Close</button>
        <ModalContent>{children}</ModalContent>
        <button></button>
      </ModalMain>
    </ModalC>
  );
}
