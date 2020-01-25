import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Private from './Private';
import Timeline from './Timeline';
import NewPost from './NewPost';
import Signup from './Signup';
import Login from './Login';
import GlobalStyle from '../styled/GlobalStyled';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Route
          exact={true}
          path="/"
          render={({ history }) => (
            <Private history={history} Component={Timeline} />
          )}
        />
        <Route
          path="/new_post"
          render={({ history }) => (
            <Private history={history} Component={NewPost} />
          )}
        />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </>
  );
};

export default App;
