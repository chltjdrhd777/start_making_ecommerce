import React, { useEffect, useState, useRef } from "react";
import { PramsType2 } from "./ProductList";
import { getPage, getProductBySlug } from "redux/productslice";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "redux/mainReducer";
import { paramRendor } from "util/Params";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarouselMaker from "components/Carousel";
import Cards from "components/Cards";

function StorepageForApple(props: PramsType2) {
  const dispatch = useDispatch();
  const typeCheck = paramRendor(props.location.search) as { categoryId: string; type: string };
  const pageData = useSelector(selectProduct).pageInfo;
  console.log(pageData);
  const { slug } = props.match.params;

  useEffect(() => {
    dispatch(getProductBySlug(slug));
    dispatch(getPage(typeCheck));
  }, []);

  return (
    <>
      <CarouselMaker typecheck={typeCheck} pageData={pageData} />

      <Cards pageData={pageData} />
    </>
  );
}

export default StorepageForApple;
