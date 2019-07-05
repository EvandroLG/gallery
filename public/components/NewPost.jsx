import React, { useState, useRef } from 'react';
import PropTypes from "prop-types";
import http from '../libs/http';

const NewPost = ({ history }) => {
  const [description, setDescription] = useState('');
  const inputImage = useRef(null);
  const inputDescription = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('photo', inputImage.current.files[0]);
    data.append('description', inputDescription.current.value);

    const result = await http.post('/api/post', data);

    if (result.ok) {
      history.push('/');
    }
  }

  return (
    <>
      <h1>New Post</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="image">
          Image
          <input
            ref={inputImage}
            id="image"
            type="file"
          />
        </label>

        <label htmlFor="description">
          <textarea
            ref={inputDescription}
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>

        <input
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
}

NewPost.propTypes = {
  history: PropTypes.object
};

export default NewPost;
