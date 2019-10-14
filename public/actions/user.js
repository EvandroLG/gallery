import { get, authorizationHeader } from "../libs/http";

export const AUTHENTICATION_UPDATE = 'AUTHENTICATION_UPDATE';

const getAuthenticationUpdate = (data) => {
  return {
    type: AUTHENTICATION_UPDATE,
    payload: data,
  };
};

export const fetchAuthentication = () => {
  return async (dispatch) => {
    try {
      const data = await get('/api/auth', {
        ...authorizationHeader,
        'Content-Type': 'application/json',
      });

      dispatch(
        getAuthenticationUpdate({
          isLogged: true,
          username: data.username,
        })
      );
    } catch {
      dispatch(
        getAuthenticationUpdate({
          isLogged: false,
          username: null,
        })
      );
    }
  };
};
