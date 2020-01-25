import { AUTHENTICATION_UPDATE } from '../actions/user';

const defaultState = {
  isLogged: false,
  username: null,
};

export default (
  prevState = defaultState,
  action: { type: string; payload: any },
) => {
  if (action.type === AUTHENTICATION_UPDATE) {
    return { ...action.payload };
  }

  return prevState;
};
