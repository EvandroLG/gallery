import { useEffect, useReducer, useState } from 'react';
import { authorizationHeader, get } from '../libs/http';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

export const LOADING = 'LOADING';
export const COMPLETE = 'COMPLETE';
export const ERROR = 'ERROR';

export const fetchReducer = (state, action) => {
  if (action.type === LOADING) {
    return {
      ...initialState,
      isLoading: true,
    };
  }

  if (action.type === COMPLETE) {
    return {
      ...initialState,
      data: action.payload.result,
    };
  }

  if (action.type === ERROR) {
    return {
      ...initialState,
      error: action.payload.error,
    };
  }

  return state;
};

export default (url: string) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: LOADING });

      try {
        const result = await get(url, {
          ...authorizationHeader,
        });

        dispatch({
          payload: { result },
          type: COMPLETE,
        });
      } catch (error) {
        dispatch({
          payload: { error },
          type: ERROR,
        });
      }
    }

    fetchData();
  }, [url]);

  return [state.isLoading, state.data, state.error];
};
