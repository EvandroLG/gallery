export default {
  get(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error(error));
  }
};
