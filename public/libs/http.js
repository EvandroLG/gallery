export default {
  get(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(console.error);
  },

  post(url, data) {
    return fetch(url, {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .catch(console.error);
  }
};
