import React, { useEffect } from "react";
import { PramsType2 } from "./ProductList";
import { getPage, getProductBySlug } from "redux/productslice";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "redux/mainReducer";
import { paramRendor } from "util/Params";
import styled from "styled-components";

function StorepageForApple(props: PramsType2) {
  const dispatch = useDispatch();
  const pageData = useSelector(selectProduct).pageInfo;
  const { slug } = props.match.params;
  const typeCheck = paramRendor(props.location.search) as { categoryId: string; type: string };

  useEffect(() => {
    dispatch(getProductBySlug(slug));
    dispatch(getPage(typeCheck));
  }, []);

  return <CarouselImg src={pageData.banners && pageData.banners[0].img} />;
}

const CarouselImg = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
`;

export default StorepageForApple;
