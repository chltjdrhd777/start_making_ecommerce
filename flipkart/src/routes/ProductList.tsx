import React, { PropsWithChildren } from "react";
import HeaderLayout from "Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "redux/mainReducer";
import { RouteComponentProps } from "react-router-dom";
import { getProductBySlug } from "redux/productslice";

interface PropsType {
  slug: string;
}

function ProductList(props: RouteComponentProps<PropsType>) {
  const dispatch = useDispatch();
  const productCheck = useSelector(selectProduct);
  const { slug } = props.match.params;

  console.log(slug);
  dispatch(getProductBySlug(slug));

  return (
    <HeaderLayout>
      <div>g</div>
    </HeaderLayout>
  );
}

export default ProductList;
