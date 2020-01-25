import API from '../configs/api';
import { authorizationHeader, getJson } from '../libs/http';
import { Dispatch } from 'react';

export const AUTHENTICATION_UPDATE = 'AUTHENTICATION_UPDATE';

const getAuthenticationUpdate = (data: {
  isLogged: boolean;
  username: string | null;
}) => {
  return {
    type: AUTHENTICATION_UPDATE,
    payload: data,
  };
};

export const fetchAuthentication = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const data = await getJson(
        API.GET_AUTH,
        {},
        {
          ...authorizationHeader,
        },
      );

      dispatch(
        getAuthenticationUpdate({
          isLogged: true,
          username: data.username,
        }),
      );
    } catch {
      dispatch(
        getAuthenticationUpdate({
          isLogged: false,
          username: null,
        }),
      );
    }
  };
};
