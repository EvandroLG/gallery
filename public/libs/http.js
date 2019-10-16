export const authorizationHeader = {
  'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
};

export const get = (url, headers = {}) => {
  return fetch(url, {
    headers,
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }

    throw response;
  });
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
