import React, { useEffect, useState } from 'react';
import { History } from 'history';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/user';

const Private = ({
  history,
  Component,
  isLogged,
  getAuthentication,
}: {
  history: History;
  Component: any;
  isLogged: boolean;
  getAuthentication: () => any;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function request() {
      await getAuthentication();
      setIsLoaded(true);
    }

    request();
  }, [getAuthentication]);

  if (!isLoaded) {
    return null;
  }

  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return <Component history={history} />;
};

const mapStateToProps = ({ user }: { user: { isLogged: boolean } }) => ({
  isLogged: user.isLogged,
});

const mapDispatchToProps = {
  getAuthentication: fetchAuthentication,
};

export default connect(mapStateToProps, mapDispatchToProps)(Private);
