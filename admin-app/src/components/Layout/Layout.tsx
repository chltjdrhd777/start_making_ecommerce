import React, { PropsWithChildren, ReactNode } from "react";
import Header from "../Header/Header";

export default function Layout(props: PropsWithChildren<ReactNode>) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}
