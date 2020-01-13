import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Private from './Private';
import Timeline from './Timeline';
import NewPost from './NewPost';
import Signup from './Signup';
import Login from './Login';
import GlobalStyle from '../styled/GlobalStyled';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Route
          exact
          path="/"
          render={props => <Private {...props} Component={Timeline} />}
        />
        <Route
          path="/new_post"
          render={props => <Private {...props} Component={NewPost} />}
        />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </>
  );
}
