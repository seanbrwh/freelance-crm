import React from "react";
import styled, { keyframes } from "styled-components";

export default function Loading() {
  const Scale1 = keyframes`
  0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
    `;

  const Scale2 = keyframes`
  0% {
       transform: translate(0, 0);
     }
     100% {
       transform: translate(24px, 0);
     }
  `;
  const Scale3 = keyframes`
  0% {
       transform: scale(1);
     }
     100% {
       transform: scale(0);
     }
  `;
  const LoadingContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  `;
  const LoadingEllipsis = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: #aaccff;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    div:nth-child(1) {
      left: 8px;
      animation: ${Scale1} 0.6s infinite;
    }
    div:nth-child(2) {
      left: 8px;
      animation: ${Scale2} 0.6s infinite;
    }
    div:nth-child(3) {
      left: 32px;
      animation: ${Scale2} 0.6s infinite;
    }
    div:nth-child(4) {
      left: 56px;
      animation: ${Scale3} 0.6s infinite;
    }
  `;

  return (
    <LoadingContainer>
      <LoadingEllipsis>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingEllipsis>
    </LoadingContainer>
  );
}
