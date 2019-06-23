export default {
  get(url) {
    console.log(url);

    return fetch(url)
      .then(response => response.json())
      .catch(error => console.error(error));
  },
};
