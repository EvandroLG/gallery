import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Private from './Private';
import Timeline from './Timeline';
import NewPost from './NewPost';
import Signup from './Signup';
import Login from './Login';

import theme from '../configs/theme';

const GlobalStyle = createGlobalStyle`
  html, body, h1, a, p,
  span, ul, li, section, header {
      margin: 0;
      padding: 0;
      border: 0;
  }

  * {
    box-sizing: border-box;
    color: ${theme.DEFAULT_TEXT_COLOR};
    font-family: Helvetica, Arial, sans-serif;
    border: 0;
  }

  body {
    background: ${theme.BG_BODY};
  }

  a {
    text-decoration: none;
    color: ${theme.DEFAULT_LINK_COLOR};
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Route exact path="/" render={props => <Private {...props} Component={Timeline} />} />
        <Route path="/new_post" render={props => <Private {...props} Component={NewPost} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </>
  );
}
