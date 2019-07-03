import React, { useState, useRef } from 'react';

export default function NewPost() {
  const [description, setDescription] = useState('');
  const inputImage = useRef(null);
  const inputDescription = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
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
