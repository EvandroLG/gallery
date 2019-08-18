import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle } from "styled-components";
import Header from "./Header";
import Timeline from "./Timeline";
import NewPostContainer from '../containers/NewPostContainer';
import Signup from './Signup';
import Login from './Login';

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
    border: 0;
  }

  body {
    background: #fafafa;
  }

  a {
    text-decoration: none;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Route
          exact
          path='/'
          component={Timeline}
        />
        <Route
          path='/new_post'
          component={NewPostContainer}
        />
        <Route
          path='/signup'
          component={Signup}
        />
        <Route
          path='/login'
          component={Login}
        />
      </BrowserRouter>
    </>
  );
}
