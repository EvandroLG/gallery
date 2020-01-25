import { History } from 'history';

interface IQueryString {
  [key: string]: string;
}

export const authorizationHeader = {
  Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
};

export const get = (
  url: string,
  querystring: IQueryString = {},
  headers = {},
) => {
  const urlObject = new URL(url, location.href);

  Object.keys(querystring).forEach(key => {
    urlObject.searchParams.append(key, querystring[key]);
  });

  return fetch(urlObject.toString(), {
    headers,
  });
};

export const getJson = async (url: string, querystring = {}, headers = {}) => {
  const result = await get(url, querystring, {
    'Content-Type': 'application/json',
    ...headers,
  });

  if (result.ok) {
    return result.json();
  }

  throw result;
};

export const post = (url: string, data: any, headers = {}) => {
  return fetch(url, {
    method: 'POST',
    headers,
    body: data,
  });
};

export const postWithRedirect = async (
  url: string,
  data: any,
  history: History,
) => {
  const result = await post(url, JSON.stringify(data), {
    'Content-Type': 'application/json',
  });

  if (result.ok) {
    const { token } = await result.json();
    localStorage.setItem('jwt_token', token);
    history.push('/');
  }
};
