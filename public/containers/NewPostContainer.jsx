import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { fetchAuthentication } from '../actions/user';
import NewPost from '../components/NewPost';

const NewPostContainer = ({ history, isLogged, getAuthentication }) => {
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

  return (
    <NewPost
      history={history}
      isLogged={isLogged}
    />
  );
};

NewPostContainer.propTypes = {
  history: PropTypes.object.isRequired,
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
)(NewPostContainer);
