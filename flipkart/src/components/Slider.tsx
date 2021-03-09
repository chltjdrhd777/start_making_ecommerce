import React from "react";
import styled from "styled-components";

interface PropType {
  img: string;
}

function Slider({ img }: PropType) {
  return <SliderImg src={img} />;
}

const SliderImg = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
`;

export default Slider;
