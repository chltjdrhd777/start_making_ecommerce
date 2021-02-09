import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalCSS = createGlobalStyle`
  margin:0;
  padding:0;
  text-decoration:none;

  body{
    font-family: 'Open Sans', sans-serif;
  }
`;

ReactDOM.render(
  <>
    <GlobalCSS />
    <App />
  </>,

  document.getElementById("root")
);
