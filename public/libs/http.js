export const authorizationHeader = {
  Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
};

export const get = (url, querystring = {}, headers = {}) => {
  const urlObject = new URL(url, location.href);

  Object.keys(querystring).forEach(key => {
    urlObject.searchParams.append(key, querystring[key]);
  });

  return fetch(urlObject, {
    headers,
  });
};

export const getJson = async (url, querystring = {}, headers = {}) => {
  const result = await get(url, querystring, headers);

  if (result.ok) {
    return result.json();
  }

  throw result;
};

export const post = (url, data, headers = {}) => {
  return fetch(url, {
    method: 'POST',
    headers,
    body: data,
  });
};

export const postWithRedirect = async (url, data, history) => {
  const result = await post(url, JSON.stringify(data), {
    'Content-Type': 'application/json',
  });

  if (result.ok) {
    const { token } = await result.json();
    localStorage.setItem('jwt_token', token);
    history.push('/');
  }
};
