import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle } from "styled-components";
import Header from "./Header";
import Private from './Private';
import Timeline from "./Timeline";
import NewPost from './NewPost';
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
          render={props =>
            <Private { ...props } Component={Timeline} />
          }
        />
        <Route
          path='/new_post'
          render={props =>
            <Private { ...props } Component={NewPost} />
          }
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
