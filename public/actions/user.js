import http from "../libs/http";

export const USER_UPDATE = 'USER_UPDATE';

export const fetchAuthentication = () => {
  return async (dispatch) => {
    try {
      const data = await http.get('/api/auth', {
        authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      });

      dispatch(data);
    } catch {
      dispatch({
        isLogged: false,
        nickname: null,
      });
    }
  };
};
