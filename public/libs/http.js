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
