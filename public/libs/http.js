export default {
  get(url, headers = {}) {
    return fetch(url, {
      headers,
    })
      .then(response => {
        console.log(response.status);
        response.json();
      })
      .catch(console.error);
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
