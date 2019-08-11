export default {
  get(url, headers = {}) {
    return fetch(url, {
      headers,
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw response;
      });
  },

  post(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};
