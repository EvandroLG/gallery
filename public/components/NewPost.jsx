import React, { useState, useRef } from 'react';
import http from '../libs/http';

export default function NewPost() {
  const [description, setDescription] = useState('');
  const inputImage = useRef(null);
  const inputDescription = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('photo', inputImage.current.files[0]);
    data.append('description', inputDescription.current.value);

    http.post('/api/post', data);
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
