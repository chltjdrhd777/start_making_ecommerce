import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { createStore } from "./redux/store";

import App from "./App";

const GlobalCSS = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    text-decoration:none;
    list-style:none;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalCSS />
    <Provider store={createStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
