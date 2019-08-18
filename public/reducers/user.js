import { AUTHENTICATION_UPDATE } from '../actions/user';

const defaultState = {
  isLogged: false,
  username: null,
};

export default (prevState = defaultState, action) => {
  if (action.type === AUTHENTICATION_UPDATE) {
    return { ...action.payload };
  }

  return prevState;
};
