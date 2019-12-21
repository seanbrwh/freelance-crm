import React from "react";
import styled from "styled-components";

const ICard = styled.div`
  width: 25rem;
  height: 35rem;
  padding: 4rem 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 0.2rem;
  background: rgb(230, 230, 230);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
const ImgCard = styled.div``;
const CardImg = styled.img``;
const CardTitle = styled.span``;
const CardContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

interface CardProps {
  title?: string;
  children?: JSX.Element | JSX.Element[];
  img?: string;
}

export default function Card({ title, children, img }: CardProps) {
  return (
    <ICard>
      <ImgCard>
        <CardImg src={img} />
        <CardTitle>{title}</CardTitle>
      </ImgCard>
      <CardContent>{children}</CardContent>
    </ICard>
  );
}
