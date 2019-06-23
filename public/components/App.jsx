import React from "react";
import { createGlobalStyle } from "styled-components";
import Header from "./Header";
import Timeline from "./Timeline";

const GlobalStyle = createGlobalStyle`
  html, body, h1, a, p,
  span, ul, li, section, header {
      margin: 0;
      padding: 0;
      border: 0;
  }

  * {
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
  }

  body {
    background: #fafafa;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Timeline />
    </>
  );
}
