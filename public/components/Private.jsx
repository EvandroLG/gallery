import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/user';

const Private = ({ history, Component, isLogged, getAuthentication }) => {
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    async function request() {
      await getAuthentication();
      setIsLoaded(true);
    }

    request();
  }, [ getAuthentication ]);

  if (!isLoaded) {
    return null;
  }

  if (!isLogged) {
    return <Redirect to='/login' />;
  }

  return <Component history={history} />;
};

Private.propTypes = {
  history: PropTypes.object.isRequired,
  Component: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  getAuthentication: PropTypes.func,
};

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged,
});

const mapDispatchToProps = {
  getAuthentication: fetchAuthentication,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Private);
