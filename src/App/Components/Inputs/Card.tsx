import React from "react";
import styled from "styled-components";

const Row = styled.div``;
const Col = styled.div``;
const ICard = styled.div``;
const ImgCard = styled.div``;
const CardImg = styled.img``;
const CardTitle = styled.span``;
const CardContent = styled.div``;
const CardAction = styled.div``;

export default function Card() {
  return (
    <Row>
      <Col>
        <ICard>
          <ImgCard>
            <CardImg />
            <CardTitle>Card Title</CardTitle>
          </ImgCard>
          <CardContent>
            <p>Simple Card</p>
          </CardContent>
          <CardAction>some action or link</CardAction>
        </ICard>
      </Col>
    </Row>
  );
}
